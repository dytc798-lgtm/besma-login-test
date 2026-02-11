"use client";

import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, RotateCcw, CheckCircle2 } from "lucide-react";

interface SignaturePadProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (signatureData: string) => void;
  workerName: string;
}

export default function SignaturePad({ isOpen, onClose, onConfirm, workerName }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas 크기 설정
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    // 그리기 스타일 설정
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  }, [isOpen]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleConfirm = () => {
    if (!hasSignature) {
      alert("서명을 먼저 작성해주세요.");
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Canvas를 이미지로 변환
    const signatureData = canvas.toDataURL("image/png");
    onConfirm(signatureData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4 shadow-2xl">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-safety-navy">위험성평가 서명</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 근로자 정보 */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">서명자</div>
          <div className="font-semibold text-lg">{workerName}</div>
        </div>

        {/* 서명 영역 */}
        <div className="mb-4">
          <div className="text-sm text-gray-600 mb-2">손가락 또는 펜으로 서명해주세요</div>
          <div className="border-2 border-gray-300 rounded-lg bg-white relative" style={{ touchAction: "none" }}>
            <canvas
              ref={canvasRef}
              className="w-full cursor-crosshair"
              style={{ height: "200px", touchAction: "none" }}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3">
          <Button
            onClick={clearSignature}
            variant="outline"
            className="flex-1"
            disabled={!hasSignature}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            지우기
          </Button>
          <Button
            onClick={handleConfirm}
            className="flex-1 bg-green-600 hover:bg-green-700"
            disabled={!hasSignature}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            확인
          </Button>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-700 text-center">
          서명 완료 시 TBM 일지로 자동 연동됩니다.
        </div>
      </div>
    </div>
  );
}
