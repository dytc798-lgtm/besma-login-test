"use client";

import {
  Feature,
  ProcessDiagram,
  UiMock,
} from "@/lib/architecture-features";
import {
  MINI_CANVAS_PADDING,
  MINI_BOX_TO_ARROW,
  MINI_LABEL_ABOVE,
  MINI_LABEL_PAD,
  MINI_ARROW_MIN_LENGTH,
  MiniDiagramWrapper,
} from "./MiniDiagramLayout";

// 공통 MiniDiagram: feature.processDiagram 기반
function MiniProcessDiagram({ process }: { process: ProcessDiagram }) {
  if (!process?.nodes?.length) {
    return null;
  }

  const pad = MINI_CANVAS_PADDING;
  const nodeW = 110;
  const nodeH = 46;
  const gapX = MINI_BOX_TO_ARROW + MINI_ARROW_MIN_LENGTH + MINI_BOX_TO_ARROW;
  const centerY = pad + nodeH / 2;

  const positions = process.nodes.map((_, index) => ({
    x: pad + index * (nodeW + gapX),
    y: pad,
  }));

  const contentMaxX =
    positions[positions.length - 1].x + nodeW + pad;
  const contentMaxY = pad + nodeH + pad;

  return (
    <MiniDiagramWrapper
      viewWidth={contentMaxX}
      viewHeight={contentMaxY}
    >
      <defs>
        <marker
          id="featureArrow"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <path d="M0 0 L8 3 L0 6 z" fill="#64748b" />
        </marker>
      </defs>

      {process.nodes.map((node, i) => {
        const { x, y } = positions[i];
        const fill =
          node.type === "actor"
            ? "#eef2ff"
            : node.type === "external"
            ? "#f1f5f9"
            : "#f8fafc";
        const stroke =
          node.type === "actor"
            ? "#6366f1"
            : node.type === "external"
            ? "#94a3b8"
            : "#64748b";
        return (
          <g key={node.id}>
            <rect
              x={x}
              y={y}
              width={nodeW}
              height={nodeH}
              rx={10}
              ry={10}
              fill={fill}
              stroke={stroke}
              strokeWidth={1}
            />
            <text
              x={x + nodeW / 2}
              y={y + nodeH / 2 + 4}
              textAnchor="middle"
              fontSize={11}
              fill="#0f172a"
            >
              {node.label}
            </text>
          </g>
        );
      })}

      {process.edges?.map((edge, idx) => {
        const fromIndex = process.nodes.findIndex(
          (n) => n.id === edge.from,
        );
        const toIndex = process.nodes.findIndex(
          (n) => n.id === edge.to,
        );
        if (fromIndex === -1 || toIndex === -1) return null;
        const from = positions[fromIndex];
        const to = positions[toIndex];
        const startX = from.x + nodeW + MINI_BOX_TO_ARROW;
        const endX = to.x - MINI_BOX_TO_ARROW;
        const arrowY = centerY;
        const labelX = (startX + endX) / 2;
        const labelW =
          edge.label.length * 8 + MINI_LABEL_PAD * 2;
        const labelH = 12 + MINI_LABEL_PAD * 2;

        return (
          <g key={`${edge.from}-${edge.to}-${idx}`}>
            <line
              x1={startX}
              y1={arrowY}
              x2={endX}
              y2={arrowY}
              stroke="#64748b"
              strokeWidth={1}
              markerEnd="url(#featureArrow)"
            />
            <rect
              x={labelX - labelW / 2}
              y={arrowY - MINI_LABEL_ABOVE - labelH}
              width={labelW}
              height={labelH}
              rx={6}
              fill="white"
              stroke="#e2e8f0"
              strokeWidth={1}
            />
            <text
              x={labelX}
              y={
                arrowY -
                MINI_LABEL_ABOVE -
                MINI_LABEL_PAD -
                4
              }
              textAnchor="middle"
              fontSize={11}
              fontWeight={700}
              fill="#334155"
            >
              {edge.label}
            </text>
          </g>
        );
      })}
    </MiniDiagramWrapper>
  );
}

// 공통 UI 목업 렌더러
function UiMockRenderer({ uiMock }: { uiMock: UiMock }) {
  return (
    <div className="space-y-4 text-[14px] text-gray-700">
      <h3 className="text-[18px] font-semibold text-gray-900">
        {uiMock.title}
      </h3>
      {uiMock.sections.map((section) => (
        <section
          key={section.heading}
          className="rounded-lg border border-gray-200 bg-white p-3"
        >
          <h4 className="mb-2 text-[14px] font-semibold text-gray-800">
            {section.heading}
          </h4>
          {section.fields && (
            <div className="space-y-1">
              {section.fields.map((field) => (
                <div key={field.label}>
                  <span className="mr-2 text-gray-500">
                    {field.label}
                  </span>
                  {field.value && (
                    <span className="text-gray-900">
                      {field.value}
                    </span>
                  )}
                  {!field.value && field.placeholder && (
                    <span className="text-gray-400">
                      {field.placeholder}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
          {section.actions && (
            <div className="mt-3 flex flex-wrap gap-2">
              {section.actions.map((action) => {
                const base =
                  "rounded px-3 py-1.5 text-[14px]";
                const variant =
                  action.variant === "primary"
                    ? "bg-gray-900 text-white"
                    : action.variant === "danger"
                    ? "bg-red-600 text-white"
                    : "border border-gray-300 bg-white text-gray-800";
                return (
                  <button
                    key={action.label}
                    type="button"
                    className={`${base} ${variant}`}
                  >
                    {action.label}
                  </button>
                );
              })}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

export function FeatureDetail({ feature }: { feature: Feature }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-[14px] font-medium text-gray-700">
          세부 프로세스
        </p>
        <MiniProcessDiagram process={feature.processDiagram} />
      </div>
      <div>
        <p className="mb-2 text-[14px] font-medium text-gray-700">
          화면 와이어프레임
        </p>
        <UiMockRenderer uiMock={feature.uiMock} />
      </div>
    </div>
  );
}

