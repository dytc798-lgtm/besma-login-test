/**
 * 베타 전용 안전 작업일보(safety worklog).
 * DB 없이 메모리 저장, 추후 DB 교체 가능하도록 구조 유지.
 */

export type WorklogSource = "MANUAL" | "FILE_IMPORT" | "ERP_SYNC";

export interface SafetyWorklog {
  id: string;
  tenantId: string;
  siteId: string;
  workDate: string; // YYYY-MM-DD
  crew: string;
  workName: string;
  description: string;
  hazard: string;
  measure: string;
  source: WorklogSource;
  sourceRef?: string;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SafetyWorklogInput {
  siteId: string;
  workDate: string;
  crew: string;
  workName: string;
  description: string;
  hazard: string;
  measure: string;
}

const DEFAULT_TENANT = "default";
const store: SafetyWorklog[] = [];
let idSeq = 1;

function nextId(): string {
  return `wl-${Date.now()}-${idSeq++}`;
}

function now(): string {
  return new Date().toISOString();
}

export function listWorklogs(tenantId: string, options?: { siteId?: string; from?: string; to?: string }): SafetyWorklog[] {
  let list = store.filter((w) => w.tenantId === tenantId);
  if (options?.siteId) list = list.filter((w) => w.siteId === options.siteId);
  if (options?.from) list = list.filter((w) => w.workDate >= options.from!);
  if (options?.to) list = list.filter((w) => w.workDate <= options.to!);
  list.sort((a, b) => b.workDate.localeCompare(a.workDate) || b.createdAt.localeCompare(a.createdAt));
  return list;
}

export function getWorklogById(worklogId: string): SafetyWorklog | null {
  return store.find((w) => w.id === worklogId) ?? null;
}

export function createWorklogManual(tenantId: string, input: SafetyWorklogInput): SafetyWorklog {
  const id = nextId();
  const createdAt = now();
  const row: SafetyWorklog = {
    id,
    tenantId,
    siteId: input.siteId,
    workDate: input.workDate,
    crew: input.crew,
    workName: input.workName,
    description: input.description,
    hazard: input.hazard,
    measure: input.measure,
    source: "MANUAL",
    createdBy: "user",
    createdAt,
    updatedAt: createdAt,
  };
  store.push(row);
  return row;
}

export function createWorklogsFromImport(
  tenantId: string,
  rows: SafetyWorklogInput[],
  fileRef: string
): SafetyWorklog[] {
  const createdAt = now();
  const created: SafetyWorklog[] = [];
  rows.forEach((input, idx) => {
    const id = nextId();
    const row: SafetyWorklog = {
      id,
      tenantId,
      siteId: input.siteId,
      workDate: input.workDate,
      crew: input.crew,
      workName: input.workName,
      description: input.description,
      hazard: input.hazard,
      measure: input.measure,
      source: "FILE_IMPORT",
      sourceRef: `${fileRef}#row${idx + 1}`,
      createdBy: "import",
      createdAt,
      updatedAt: createdAt,
    };
    store.push(row);
    created.push(row);
  });
  return created;
}

export function getDefaultTenantId(): string {
  return DEFAULT_TENANT;
}
