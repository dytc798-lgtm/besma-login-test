/**
 * 베타 작업지시(work order) 플로우: 작업지시 → 확인서명 → 시작 → 종료서명+사진
 * - 작업지시는 safety_worklog 기반 생성
 * - 확인 서명 전에는 STARTED 전환 불가
 * - 모든 상태변경은 audit log 기록
 */

import { prisma } from "@/lib/prisma";
import { getWorklogById } from "@/lib/beta-safety-worklog";

export const WORK_ORDER_STATUS = ["DRAFT", "ISSUED", "CONFIRMED", "STARTED", "ENDED"] as const;
export type WorkOrderStatus = (typeof WORK_ORDER_STATUS)[number];

const TENANT = "default";

export async function appendAudit(
  entityType: string,
  entityId: string,
  action: string,
  actorId: string | null,
  payload?: Record<string, unknown>
) {
  await prisma.auditLog.create({
    data: {
      tenantId: TENANT,
      entityType,
      entityId,
      action,
      actorId: actorId ?? undefined,
      payload: payload ? JSON.stringify(payload) : undefined,
    },
  });
}

export async function listSites(tenantId: string = TENANT) {
  return prisma.site.findMany({ where: { tenantId }, orderBy: { name: "asc" } });
}

export async function listWorkers(tenantId: string = TENANT, siteId?: string) {
  return prisma.worker.findMany({
    where: { siteId: siteId ?? undefined },
    include: { site: true },
    orderBy: { name: "asc" },
  });
}

export async function listWorkOrdersForSite(
  tenantId: string = TENANT,
  siteId: string,
  options?: { status?: WorkOrderStatus }
) {
  return prisma.workOrder.findMany({
    where: { tenantId, siteId, status: options?.status },
    include: { assignee: true },
    orderBy: { updatedAt: "desc" },
  });
}

export async function listWorkOrdersForWorker(
  tenantId: string = TENANT,
  assigneeId: string
) {
  return prisma.workOrder.findMany({
    where: { tenantId, assigneeId },
    include: { site: true },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getWorkOrderById(id: string) {
  return prisma.workOrder.findUnique({
    where: { id },
    include: { assignee: true, site: true },
  });
}

/** 작업지시 생성 (SITE_ADMIN). worklogId는 safety_worklog id */
export async function createWorkOrder(
  tenantId: string,
  input: { siteId: string; worklogId: string; assigneeId?: string },
  actorId: string
) {
  const worklog = getWorklogById(input.worklogId);
  if (!worklog) throw new Error("WORKLOG_NOT_FOUND");

  const order = await prisma.workOrder.create({
    data: {
      tenantId,
      siteId: input.siteId,
      worklogId: input.worklogId,
      status: "DRAFT",
      assigneeId: input.assigneeId ?? undefined,
      createdBy: actorId,
    },
    include: { assignee: true, site: true },
  });
  await appendAudit("work_order", order.id, "created", actorId, {
    siteId: input.siteId,
    worklogId: input.worklogId,
    assigneeId: input.assigneeId,
  });
  return order;
}

/** 배포: DRAFT → ISSUED (SITE_ADMIN) */
export async function issueWorkOrder(orderId: string, actorId: string) {
  const order = await prisma.workOrder.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("ORDER_NOT_FOUND");
  if (order.status !== "DRAFT") throw new Error("INVALID_STATUS");

  const updated = await prisma.workOrder.update({
    where: { id: orderId },
    data: { status: "ISSUED" },
    include: { assignee: true, site: true },
  });
  await appendAudit("work_order", orderId, "issued", actorId, { previous: "DRAFT" });
  return updated;
}

/** 확인 서명: ISSUED → CONFIRMED (WORKER, 본인 배정만) */
export async function confirmWorkOrder(
  orderId: string,
  assigneeId: string,
  signatureData: string
) {
  const order = await prisma.workOrder.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("ORDER_NOT_FOUND");
  if (order.assigneeId !== assigneeId) throw new Error("FORBIDDEN");
  if (order.status !== "ISSUED") throw new Error("INVALID_STATUS");

  const updated = await prisma.workOrder.update({
    where: { id: orderId },
    data: {
      status: "CONFIRMED",
      confirmSignedAt: new Date(),
      confirmSignatureData: signatureData,
    },
    include: { assignee: true, site: true },
  });
  await appendAudit("work_order", orderId, "confirmed", assigneeId, {});
  return updated;
}

/** 작업 시작: CONFIRMED → STARTED (확인 서명 후에만 가능) */
export async function startWorkOrder(orderId: string, assigneeId: string) {
  const order = await prisma.workOrder.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("ORDER_NOT_FOUND");
  if (order.assigneeId !== assigneeId) throw new Error("FORBIDDEN");
  if (order.status !== "CONFIRMED") throw new Error("INVALID_STATUS");

  const updated = await prisma.workOrder.update({
    where: { id: orderId },
    data: { status: "STARTED", startedAt: new Date() },
    include: { assignee: true, site: true },
  });
  await appendAudit("work_order", orderId, "started", assigneeId, {});
  return updated;
}

/** 종료 서명+사진: STARTED → ENDED */
export async function endWorkOrder(
  orderId: string,
  assigneeId: string,
  signatureData: string,
  photoUrl?: string
) {
  const order = await prisma.workOrder.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("ORDER_NOT_FOUND");
  if (order.assigneeId !== assigneeId) throw new Error("FORBIDDEN");
  if (order.status !== "STARTED") throw new Error("INVALID_STATUS");

  const updated = await prisma.workOrder.update({
    where: { id: orderId },
    data: {
      status: "ENDED",
      endSignedAt: new Date(),
      endSignatureData: signatureData,
      endPhotoUrl: photoUrl ?? undefined,
    },
    include: { assignee: true, site: true },
  });
  await appendAudit("work_order", orderId, "ended", assigneeId, { photoUrl });
  return updated;
}
