"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EquipmentType } from "@/app/dashboard/work-plan/page";
import { EquipmentSpec, mockForkliftSpecs, mockCraneSpecs, mockExcavatorSpecs, excavatorSafetyChecklist, mockWorkers } from "@/lib/mock-data";
import { Download, Calculator, AlertTriangle, CheckCircle2, X, FileText, Edit, FileCheck } from "lucide-react";

interface EquipmentFormProps {
  equipmentType: EquipmentType;
}

export default function EquipmentForm({ equipmentType }: EquipmentFormProps) {
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [equipmentSpec, setEquipmentSpec] = useState<EquipmentSpec | null>(null);
  const [workDate, setWorkDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [workTime, setWorkTime] = useState<string>("09:00");
  const [operatorName, setOperatorName] = useState<string>("");
  const [selectedOperatorId, setSelectedOperatorId] = useState<number | null>(null);
  const [licenseValid, setLicenseValid] = useState<boolean | null>(null);
  const [hasSignalman, setHasSignalman] = useState<boolean>(false);
  const [loadWeight, setLoadWeight] = useState<string>("");
  const [workRadius, setWorkRadius] = useState<string>(""); // 크레인용
  const [safetyFactor, setSafetyFactor] = useState<number | null>(null);
  const [limitLoad, setLimitLoad] = useState<number | null>(null);
  const [showToast, setShowToast] = useState<{ message: string; type: "info" | "success" } | null>(null);
  const [showWorkPlanModal, setShowWorkPlanModal] = useState(false);
  
  // 굴착기 전용 상태
  const [excavationDepth, setExcavationDepth] = useState<string>(""); // 굴착 깊이 (m)
  const [groundCondition, setGroundCondition] = useState<string>(""); // 지반 상태
  const [soilWeight, setSoilWeight] = useState<string>(""); // 토사 하중 (ton)
  const [tippingSafety, setTippingSafety] = useState<{ safe: boolean; factor: number } | null>(null); // 전도 안전성
  const [safetyChecklist, setSafetyChecklist] = useState<{ [key: string]: boolean }>({});

  const specs = equipmentType === "forklift" 
    ? mockForkliftSpecs 
    : equipmentType === "crane" 
    ? mockCraneSpecs 
    : mockExcavatorSpecs;

  // 모델 선택 시 제원 자동 입력
  useEffect(() => {
    if (selectedModel) {
      const spec = specs.find((s) => s.model === selectedModel);
      if (spec) {
        setEquipmentSpec(spec);
      }
    } else {
      setEquipmentSpec(null);
    }
  }, [selectedModel, specs]);

  // 안전계수 및 한계 하중 자동 계산 (지게차/크레인)
  useEffect(() => {
    if (equipmentType === "excavator") return; // 굴착기는 별도 계산
    
    if (equipmentSpec && loadWeight) {
      const load = parseFloat(loadWeight);
      if (!isNaN(load) && load > 0 && equipmentSpec.ratedLoad) {
        // 안전계수 = 정격하중 / 실제하중
        const factor = equipmentSpec.ratedLoad / load;
        setSafetyFactor(factor);

        // 크레인인 경우 작업 반경에 따른 한계 하중 계산
        if (equipmentType === "crane" && workRadius) {
          const radius = parseFloat(workRadius);
          if (!isNaN(radius) && equipmentSpec.maxRadius) {
            // 반경이 증가할수록 한계 하중 감소 (간단한 선형 감소 모델)
            const radiusRatio = radius / equipmentSpec.maxRadius;
            const adjustedLimit = equipmentSpec.ratedLoad * (1 - radiusRatio * 0.5);
            setLimitLoad(Math.max(0, adjustedLimit));
          } else {
            setLimitLoad(equipmentSpec.ratedLoad);
          }
        } else {
          // 지게차는 반경 계산 없이 정격하중 기준
          setLimitLoad(equipmentSpec.ratedLoad);
        }
      } else {
        setSafetyFactor(null);
        setLimitLoad(null);
      }
    } else {
      setSafetyFactor(null);
      setLimitLoad(null);
    }
  }, [equipmentSpec, loadWeight, workRadius, equipmentType]);

  // 굴착기 전도 방지 계산
  useEffect(() => {
    if (equipmentType === "excavator" && equipmentSpec && soilWeight) {
      const selfWeight = equipmentSpec.selfWeight; // ton
      const load = parseFloat(soilWeight); // ton
      
      if (!isNaN(load) && load > 0) {
        // 전도 안전계수 = 자체중량 / (자체중량 + 작업하중)
        // 일반적으로 자체중량이 작업하중의 2배 이상이면 안전
        const totalWeight = selfWeight + load;
        const tippingFactor = selfWeight / totalWeight;
        
        // 안전 기준: 자체중량이 총 하중의 60% 이상이면 안전
        const safe = tippingFactor >= 0.6;
        
        setTippingSafety({
          safe,
          factor: tippingFactor,
        });
      } else {
        setTippingSafety(null);
      }
    } else {
      setTippingSafety(null);
    }
  }, [equipmentType, equipmentSpec, soilWeight]);

  // 굴착기 안전 체크리스트 초기화
  useEffect(() => {
    if (equipmentType === "excavator") {
      const initialChecklist: { [key: string]: boolean } = {};
      excavatorSafetyChecklist.forEach((item) => {
        initialChecklist[item.id] = false;
      });
      setSafetyChecklist(initialChecklist);
    }
  }, [equipmentType]);

  const handleGenerate = () => {
    if (!selectedModel || !operatorName) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    if (equipmentType === "crane" && !workRadius) {
      alert("작업 반경을 입력해주세요.");
      return;
    }

    if (equipmentType === "crane" && !loadWeight) {
      alert("작업 하중을 입력해주세요.");
      return;
    }

    if (equipmentType === "forklift" && !loadWeight) {
      alert("작업 하중을 입력해주세요.");
      return;
    }

    if (equipmentType === "excavator") {
      if (!excavationDepth || !groundCondition || !soilWeight) {
        alert("굴착 깊이, 지반 상태, 토사 하중을 모두 입력해주세요.");
        return;
      }
      // 필수 체크리스트 확인
      const requiredItems = excavatorSafetyChecklist.filter((item) => item.required);
      const allRequiredChecked = requiredItems.every((item) => safetyChecklist[item.id]);
      if (!allRequiredChecked) {
        alert("필수 안전 조항 체크리스트를 모두 확인해주세요.");
        return;
      }
    }

    // 자격증 유효성 확인
    if (licenseValid === false) {
      if (!confirm("선택한 운전원의 자격증이 유효하지 않습니다. 그래도 계속하시겠습니까?")) {
        return;
      }
    }

    // 모달 표시
    setShowWorkPlanModal(true);
  };

  const handlePrint = () => {
    // PDF 출력 시뮬레이션
    setShowToast({ message: "출력이 완료되었습니다. 관리자 서버로 자동 전송되었습니다.", type: "success" });
    setShowWorkPlanModal(false);
  };

  const handleEdit = () => {
    // 수정 모드로 돌아가기
    setShowWorkPlanModal(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {equipmentType === "forklift" ? "지게차" : equipmentType === "crane" ? "크레인" : "굴착기"} 작업계획서 작성
          </CardTitle>
          <CardDescription>
            장비 모델을 선택하면 제원이 자동으로 입력됩니다
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 장비 모델 선택 */}
          <div>
            <label className="block text-lg font-semibold mb-3 text-gray-700">
              장비 모델명 <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-safety-navy focus:outline-none bg-white"
            >
              <option value="">모델을 선택하세요</option>
              {specs.map((spec) => (
                <option key={spec.model} value={spec.model}>
                  {spec.model}
                </option>
              ))}
            </select>
          </div>

          {/* 자동 입력되는 제원 정보 */}
          {equipmentSpec && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  장비 제원 (자동 입력)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">자체중량</div>
                    <div className="text-lg font-semibold">
                      {equipmentType === "excavator" 
                        ? `${equipmentSpec.selfWeight} ton` 
                        : `${equipmentSpec.selfWeight.toLocaleString()} kg`}
                    </div>
                  </div>
                  {equipmentType !== "excavator" && equipmentSpec.ratedLoad && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">정격하중</div>
                      <div className="text-lg font-semibold">{equipmentSpec.ratedLoad.toLocaleString()} kg</div>
                    </div>
                  )}
                  {equipmentType === "excavator" && equipmentSpec.bucketCapacity && (
                    <div>
                      <div className="text-sm text-gray-600 mb-1">버킷 용량</div>
                      <div className="text-lg font-semibold">{equipmentSpec.bucketCapacity} m³</div>
                    </div>
                  )}
                  <div>
                    <div className="text-sm text-gray-600 mb-1">차량너비</div>
                    <div className="text-lg font-semibold">{equipmentSpec.vehicleWidth.toLocaleString()} mm</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">차량길이</div>
                    <div className="text-lg font-semibold">{equipmentSpec.vehicleLength.toLocaleString()} mm</div>
                  </div>
                  {equipmentType === "crane" && equipmentSpec.maxLiftingHeight && (
                    <>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">최대양각높이</div>
                        <div className="text-lg font-semibold">{equipmentSpec.maxLiftingHeight.toLocaleString()} mm</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">최대작업반경</div>
                        <div className="text-lg font-semibold">{equipmentSpec.maxRadius} m</div>
                      </div>
                    </>
                  )}
                  {equipmentType === "excavator" && equipmentSpec.maxExcavationRadius && (
                    <>
                      <div>
                        <div className="text-sm text-gray-600 mb-1">최대 굴착 반경</div>
                        <div className="text-lg font-semibold">{equipmentSpec.maxExcavationRadius} m</div>
                      </div>
                      {equipmentSpec.maxExcavationDepth && (
                        <div>
                          <div className="text-sm text-gray-600 mb-1">최대 굴착 깊이</div>
                          <div className="text-lg font-semibold">{equipmentSpec.maxExcavationDepth} m</div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 작업 정보 입력 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-semibold mb-3 text-gray-700">
                작업 일시 <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={workDate}
                onChange={(e) => setWorkDate(e.target.value)}
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-safety-navy focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-lg font-semibold mb-3 text-gray-700">
                작업 시간
              </label>
              <input
                type="time"
                value={workTime}
                onChange={(e) => setWorkTime(e.target.value)}
                className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-safety-navy focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-3 text-gray-700">
              운전원 선택 <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedOperatorId || ""}
              onChange={(e) => {
                const workerId = parseInt(e.target.value);
                setSelectedOperatorId(workerId);
                const worker = mockWorkers.find((w) => w.id === workerId);
                if (worker) {
                  setOperatorName(worker.name);
                  // 자격증 유효성 확인
                  let hasValidLicense = false;
                  if (equipmentType === "forklift") {
                    hasValidLicense = worker.licenses.some((l) => l.type.includes("지게차") && l.isValid);
                  } else if (equipmentType === "crane") {
                    hasValidLicense = worker.licenses.some((l) => l.type.includes("크레인") && l.isValid);
                  } else if (equipmentType === "excavator") {
                    hasValidLicense = worker.licenses.some((l) => l.type.includes("굴착기") && l.isValid);
                  }
                  setLicenseValid(hasValidLicense);
                } else {
                  setOperatorName("");
                  setLicenseValid(null);
                }
              }}
              className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-safety-navy focus:outline-none bg-white"
            >
              <option value="">운전원을 선택하세요</option>
              {mockWorkers.map((worker) => (
                <option key={worker.id} value={worker.id}>
                  {worker.name} ({worker.team})
                </option>
              ))}
            </select>
            {licenseValid !== null && (
              <div className={`mt-3 p-3 rounded-lg flex items-center gap-2 ${
                licenseValid ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
              }`}>
                {licenseValid ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-semibold">
                      {equipmentType === "forklift" ? "지게차" : equipmentType === "crane" ? "크레인" : "굴착기"} 운전 자격증 유효
                    </span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span className="text-red-700 font-semibold">
                      {equipmentType === "forklift" ? "지게차" : equipmentType === "crane" ? "크레인" : "굴착기"} 운전 자격증이 없거나 만료되었습니다
                    </span>
                  </>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <input
              type="checkbox"
              id="signalman"
              checked={hasSignalman}
              onChange={(e) => setHasSignalman(e.target.checked)}
              className="w-6 h-6"
            />
            <label htmlFor="signalman" className="text-lg font-semibold cursor-pointer">
              신호수 배치 여부
            </label>
          </div>

          {/* 하중 정보 (지게차/크레인) */}
          {equipmentType !== "excavator" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold mb-3 text-gray-700">
                  작업 하중 (kg) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={loadWeight}
                  onChange={(e) => setLoadWeight(e.target.value)}
                  placeholder="하중을 입력하세요"
                  className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-safety-navy focus:outline-none"
                />
              </div>
              {equipmentType === "crane" && (
                <div>
                  <label className="block text-lg font-semibold mb-3 text-gray-700">
                    작업 반경 (m) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={workRadius}
                    onChange={(e) => setWorkRadius(e.target.value)}
                    placeholder="작업 반경을 입력하세요"
                    className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-safety-navy focus:outline-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* 굴착기 전용 입력 항목 */}
          {equipmentType === "excavator" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-semibold mb-3 text-gray-700">
                    굴착 깊이 (m) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={excavationDepth}
                    onChange={(e) => setExcavationDepth(e.target.value)}
                    placeholder="굴착 깊이를 입력하세요"
                    className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-safety-navy focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-lg font-semibold mb-3 text-gray-700">
                    지반 상태 <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={groundCondition}
                    onChange={(e) => setGroundCondition(e.target.value)}
                    className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-safety-navy focus:outline-none bg-white"
                  >
                    <option value="">지반 상태를 선택하세요</option>
                    <option value="견고">견고</option>
                    <option value="보통">보통</option>
                    <option value="약지반">약지반</option>
                    <option value="매설물존재">지하매설물 존재</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-lg font-semibold mb-3 text-gray-700">
                  예상 토사 하중 (ton) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={soilWeight}
                  onChange={(e) => setSoilWeight(e.target.value)}
                  placeholder="토사 하중을 입력하세요"
                  className="w-full p-4 text-lg border-2 border-gray-300 rounded-lg focus:border-safety-navy focus:outline-none"
                />
              </div>
            </div>
          )}

          {/* 굴착기 전도 방지 계산 결과 */}
          {equipmentType === "excavator" && tippingSafety !== null && (
            <Card className={`border-2 ${tippingSafety.safe ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  전도 안전성 계산 결과 (자동 계산)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600 mb-2">전도 안전계수</div>
                    <div className={`text-3xl font-bold ${tippingSafety.safe ? "text-green-600" : "text-red-600"}`}>
                      {tippingSafety.factor.toFixed(2)}
                    </div>
                    <div className={`mt-2 flex items-center gap-2 ${tippingSafety.safe ? "text-green-600" : "text-red-600"}`}>
                      {tippingSafety.safe ? (
                        <>
                          <CheckCircle2 className="w-5 h-5" />
                          <span className="text-sm font-semibold">안전: 전도 위험이 낮습니다</span>
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="w-5 h-5" />
                          <span className="text-sm font-semibold">위험: 전도 위험이 있습니다. 지지대 설치 필요</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600">
                    * 자체중량이 총 하중(자체중량 + 토사하중)의 60% 이상이면 안전합니다.
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 굴착기 안전 조항 체크리스트 */}
          {equipmentType === "excavator" && (
            <Card className="bg-blue-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  법적 안전 조항 체크리스트 (산안법/시행규칙)
                </CardTitle>
                <CardDescription>
                  차량계 건설기계(굴착기) 관련 안전 조항을 확인하세요
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {excavatorSafetyChecklist.map((item) => (
                    <div key={item.id} className="flex items-start gap-3 p-3 bg-white rounded-lg">
                      <input
                        type="checkbox"
                        id={item.id}
                        checked={safetyChecklist[item.id] || false}
                        onChange={(e) => setSafetyChecklist({ ...safetyChecklist, [item.id]: e.target.checked })}
                        className="w-5 h-5 mt-1 flex-shrink-0"
                      />
                      <div className="flex-1">
                        <label htmlFor={item.id} className="text-base font-medium cursor-pointer">
                          {item.item}
                          {item.required && <span className="text-red-500 ml-1">*</span>}
                        </label>
                        <div className="text-xs text-gray-500 mt-1">{item.law}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* 자동 계산 결과 (지게차/크레인) */}
          {equipmentType !== "excavator" && safetyFactor !== null && limitLoad !== null && (
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  안전 계산 결과 (자동 계산)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-2">안전계수 (Safety Factor)</div>
                    <div className={`text-3xl font-bold ${safetyFactor >= 1.5 ? "text-green-600" : safetyFactor >= 1.2 ? "text-yellow-600" : "text-red-600"}`}>
                      {safetyFactor.toFixed(2)}
                    </div>
                    {safetyFactor < 1.2 && (
                      <div className="mt-2 flex items-center gap-2 text-red-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm">위험: 안전계수가 낮습니다</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-2">
                      {equipmentType === "crane" ? "작업 반경에 따른 한계 하중" : "정격 하중"}
                    </div>
                    <div className="text-3xl font-bold text-blue-600">
                      {limitLoad.toFixed(0).toLocaleString()} kg
                    </div>
                    {parseFloat(loadWeight) > limitLoad && (
                      <div className="mt-2 flex items-center gap-2 text-red-600">
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-sm">경고: 한계 하중을 초과했습니다</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

            {/* 출력 버튼 */}
            <div className="pt-6 border-t space-y-3">
              <Button
                onClick={handleGenerate}
                size="lg"
                className="w-full py-6 text-lg font-bold bg-safety-navy hover:bg-safety-navy-light"
              >
                <Download className="w-6 h-6 mr-2" />
                작업계획서 생성 및 출력
              </Button>
              <Button
                onClick={() => {
                  // 작업허가서 생성 페이지로 이동 (작업계획서 데이터 전달)
                  window.location.href = `/dashboard/work-permit?from=work-plan&type=${equipmentType}&model=${selectedModel}&operator=${operatorName}&date=${workDate}&time=${workTime}`;
                }}
                size="lg"
                variant="outline"
                className="w-full py-6 text-lg font-bold border-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                disabled={!selectedModel || !operatorName || !workDate}
              >
                <FileCheck className="w-6 h-6 mr-2" />
                작업허가서 생성
              </Button>
            </div>
        </CardContent>
      </Card>

      {/* 작업계획서 모달 */}
      {showWorkPlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* 모달 헤더 */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-safety-navy" />
                <h2 className="text-2xl font-bold text-safety-navy">
                  {equipmentType === "forklift" ? "지게차" : equipmentType === "crane" ? "크레인" : "굴착기"} 작업계획서
                </h2>
              </div>
              <button
                onClick={() => setShowWorkPlanModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 작업계획서 내용 */}
            <div className="p-6 space-y-6">
              {/* 기본 정보 */}
              <div className="grid grid-cols-2 gap-4 border-b pb-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">작업 일시</div>
                  <div className="font-semibold">{workDate} {workTime}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">운전원</div>
                  <div className="font-semibold">{operatorName}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">장비 모델</div>
                  <div className="font-semibold">{selectedModel}</div>
                </div>
                {equipmentType === "crane" && (
                  <div>
                    <div className="text-sm text-gray-600 mb-1">작업 반경</div>
                    <div className="font-semibold">{workRadius} m</div>
                  </div>
                )}
                {equipmentType === "excavator" && (
                  <>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">굴착 깊이</div>
                      <div className="font-semibold">{excavationDepth} m</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 mb-1">지반 상태</div>
                      <div className="font-semibold">{groundCondition}</div>
                    </div>
                  </>
                )}
              </div>

              {/* 장비 제원 */}
              {equipmentSpec && (
                <div className="border-b pb-4">
                  <h3 className="font-semibold mb-3">장비 제원</h3>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">자체중량:</span>{" "}
                      <span className="font-semibold">
                        {equipmentType === "excavator" 
                          ? `${equipmentSpec.selfWeight} ton` 
                          : `${equipmentSpec.selfWeight.toLocaleString()} kg`}
                      </span>
                    </div>
                    {equipmentType !== "excavator" && equipmentSpec.ratedLoad && (
                      <div>
                        <span className="text-gray-600">정격하중:</span>{" "}
                        <span className="font-semibold">{equipmentSpec.ratedLoad.toLocaleString()} kg</span>
                      </div>
                    )}
                    {equipmentType === "excavator" && equipmentSpec.bucketCapacity && (
                      <div>
                        <span className="text-gray-600">버킷 용량:</span>{" "}
                        <span className="font-semibold">{equipmentSpec.bucketCapacity} m³</span>
                      </div>
                    )}
                    {loadWeight && (
                      <div>
                        <span className="text-gray-600">작업 하중:</span>{" "}
                        <span className="font-semibold">
                          {equipmentType === "excavator" ? `${soilWeight} ton` : `${loadWeight} kg`}
                        </span>
                      </div>
                    )}
                    {safetyFactor && (
                      <div>
                        <span className="text-gray-600">안전계수:</span>{" "}
                        <span className="font-semibold">{safetyFactor.toFixed(2)}</span>
                      </div>
                    )}
                    {limitLoad && equipmentType !== "excavator" && (
                      <div>
                        <span className="text-gray-600">한계 하중:</span>{" "}
                        <span className="font-semibold">{limitLoad.toFixed(0).toLocaleString()} kg</span>
                      </div>
                    )}
                    {tippingSafety && equipmentType === "excavator" && (
                      <div>
                        <span className="text-gray-600">전도 안전성:</span>{" "}
                        <span className={`font-semibold ${tippingSafety.safe ? "text-green-600" : "text-red-600"}`}>
                          {tippingSafety.safe ? "안전" : "위험"} (계수: {tippingSafety.factor.toFixed(2)})
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 안전 조치 */}
              <div className="border-b pb-4">
                <h3 className="font-semibold mb-3">안전 조치 사항</h3>
                <div className="space-y-2 text-sm">
                  {hasSignalman && (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      <span>신호수 배치 완료</span>
                    </div>
                  )}
                  {equipmentType === "excavator" && (
                    <div className="space-y-1">
                      {Object.entries(safetyChecklist)
                        .filter(([_, checked]) => checked)
                        .map(([id, _]) => {
                          const item = excavatorSafetyChecklist.find((i) => i.id === id);
                             return item ? (
                               <div key={id} className="flex items-center gap-2">
                                 <CheckCircle2 className="w-4 h-4 text-green-600" />
                                 <span>{item.item}</span>
                               </div>
                             ) : null;
                        })}
                    </div>
                  )}
                </div>
              </div>

              {/* 결재란 */}
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">결재</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border-2 border-gray-300 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600 mb-2">공사차장</div>
                    <div className="h-16 border-b-2 border-dashed border-gray-300 mb-2"></div>
                    <div className="text-xs text-gray-500">(인)</div>
                  </div>
                  <div className="border-2 border-gray-300 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600 mb-2">안전과장</div>
                    <div className="h-16 border-b-2 border-dashed border-gray-300 mb-2"></div>
                    <div className="text-xs text-gray-500">(인)</div>
                  </div>
                  <div className="border-2 border-gray-300 rounded-lg p-4 text-center">
                    <div className="text-sm text-gray-600 mb-2">소장</div>
                    <div className="h-16 border-b-2 border-dashed border-gray-300 mb-2"></div>
                    <div className="text-xs text-gray-500">(인)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 모달 푸터 - 출력 및 수정 버튼 */}
            <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex gap-3 rounded-b-2xl">
              <Button
                onClick={handleEdit}
                variant="outline"
                className="flex-1"
                size="lg"
              >
                <Edit className="w-5 h-5 mr-2" />
                수정
              </Button>
              <Button
                onClick={handlePrint}
                className="flex-1 bg-safety-navy hover:bg-safety-navy-light"
                size="lg"
              >
                <Download className="w-5 h-5 mr-2" />
                출력
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 토스트 메시지 */}
      {showToast && (
        <div
          className={`fixed bottom-6 right-6 p-6 rounded-lg shadow-xl z-50 ${
            showToast.type === "info"
              ? "bg-blue-500 text-white"
              : "bg-green-500 text-white"
          }`}
        >
          <div className="flex items-center gap-3">
            {showToast.type === "info" ? (
              <div className="animate-spin">⏳</div>
            ) : (
              <div>✓</div>
            )}
            <span className="text-lg font-semibold">{showToast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
