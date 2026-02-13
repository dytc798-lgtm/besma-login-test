/**
 * 시드: 현장 1개 + 근로자 2명
 * 작업일보 샘플 3건은 in-memory 저장이라 API로 추가: GET /api/beta/seed/worklog (한 번 호출)
 */
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();
import { PrismaClient } from "../lib/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  const site = await prisma.site.upsert({
    where: { id: "seed-site-1" },
    update: {},
    create: {
      id: "seed-site-1",
      name: "A현장",
      tenantId: "default",
    },
  });

  await prisma.worker.upsert({
    where: { id: "seed-worker-1" },
    update: {},
    create: {
      id: "seed-worker-1",
      name: "김근로",
      role: "WORKER",
      siteId: site.id,
    },
  });
  await prisma.worker.upsert({
    where: { id: "seed-worker-2" },
    update: {},
    create: {
      id: "seed-worker-2",
      name: "이현장",
      role: "WORKER",
      siteId: site.id,
    },
  });

  console.log("Seed done: 1 site, 2 workers.");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
