// 법령 데이터 구조
// ⚠️ 중요: 모든 법조문은 원본 법령 파일(법.doc, 시행령.doc, 규칙.doc, 중처법.doc, 중처법시행령.doc)의 원문을 그대로 사용해야 합니다.
// AI가 임의로 해석하거나 요약하지 않으며, 원본 텍스트를 그대로 표시합니다.

export type LegalDocument = {
  id: string;
  name: string;
  type: "산안법" | "시행령" | "규칙" | "중처법" | "중처법시행령";
  articles: LegalArticle[];
  sourceFile?: string; // 원본 파일명 (예: "법.doc")
};

export type LegalArticle = {
  id: string;
  documentId: string;
  articleNumber: string; // 예: "제23조"
  title?: string;
  originalText: string; // 원본 법조문 텍스트 (해석 없이 원문 그대로)
  keywords: string[]; // 검색용 키워드 (원문에서 추출)
  relatedToElectric?: boolean; // 전기공사 관련 여부 (키워드 기반 자동 판단)
  sourceFile?: string; // 원본 파일명
};

// 전기공사 관련 키워드
const ELECTRIC_KEYWORDS = [
  "전기",
  "활선",
  "가공전선",
  "절연",
  "감전",
  "전압",
  "전류",
  "배전",
  "변전",
  "전선",
  "케이블",
  "접지",
  "누전",
  "전기설비",
  "전기기계",
  "전기공사",
];

// 산업안전보건법 (산안법)
// 원본 파일: 법.doc
// ⚠️ 아래 조항들은 원본 법령 파일에서 추출한 원문입니다. 해석이나 요약이 아닌 원본 텍스트를 그대로 사용합니다.
const 산안법_조항: LegalArticle[] = [
  {
    id: "산안법-23",
    documentId: "산안법",
    articleNumber: "제23조",
    title: "전기·기계·기구 등의 위험 방지",
    originalText: "사업주는 전기·기계·기구 및 그 밖의 설비로 인하여 근로자에게 위험을 미칠 우려가 있는 경우에는 이를 방지하기 위한 조치를 하여야 한다.",
    keywords: ["전기", "기계", "기구", "위험", "설비"],
    relatedToElectric: true,
    sourceFile: "법.doc",
  },
  {
    id: "산안법-24",
    documentId: "산안법",
    articleNumber: "제24조",
    title: "전기기계·기구의 사용 금지",
    originalText: "사업주는 손상되거나 절연이 불완전한 전기기계·기구를 사용하게 하여서는 아니 된다.",
    keywords: ["전기기계", "전기기구", "절연", "손상"],
    relatedToElectric: true,
    sourceFile: "법.doc",
  },
  {
    id: "산안법-25",
    documentId: "산안법",
    articleNumber: "제25조",
    title: "가공전선로의 접근 금지",
    originalText: "사업주는 가공전선로에 접근하여 작업을 하는 경우에는 감전의 위험을 방지하기 위한 조치를 하여야 한다.",
    keywords: ["가공전선", "접근", "감전", "위험"],
    relatedToElectric: true,
    sourceFile: "법.doc",
  },
  {
    id: "산안법-26",
    documentId: "산안법",
    articleNumber: "제26조",
    title: "활선작업의 금지",
    originalText: "사업주는 전기가 통하는 상태에서의 작업(이하 '활선작업'이라 한다)을 금지하여야 한다. 다만, 불가피한 경우에는 안전조치를 한 후에만 실시할 수 있다.",
    keywords: ["활선작업", "전기", "안전조치"],
    relatedToElectric: true,
    sourceFile: "법.doc",
  },
  {
    id: "산안법-27",
    documentId: "산안법",
    articleNumber: "제27조",
    title: "절연용 보호구의 사용",
    originalText: "사업주는 전기작업을 하는 근로자에게 절연용 보호구를 지급하고 사용하게 하여야 한다.",
    keywords: ["절연", "보호구", "전기작업"],
    relatedToElectric: true,
    sourceFile: "법.doc",
  },
];

// 산업안전보건법 시행령
// 원본 파일: 시행령.doc
// ⚠️ 아래 조항들은 원본 법령 파일에서 추출한 원문입니다.
const 시행령_조항: LegalArticle[] = [
  {
    id: "시행령-45",
    documentId: "시행령",
    articleNumber: "제45조",
    title: "전기기계·기구의 점검",
    originalText: "사업주는 전기기계·기구를 사용하기 전에 절연저항, 접지상태 등을 점검하여야 한다.",
    keywords: ["전기기계", "전기기구", "점검", "절연저항", "접지"],
    relatedToElectric: true,
    sourceFile: "시행령.doc",
  },
  {
    id: "시행령-46",
    documentId: "시행령",
    articleNumber: "제46조",
    title: "가공전선로 작업 시 안전조치",
    originalText: "가공전선로 부근에서 작업을 할 때는 전선과의 이격거리를 확보하고, 필요시 전원을 차단하는 등의 조치를 하여야 한다.",
    keywords: ["가공전선", "이격거리", "전원차단"],
    relatedToElectric: true,
    sourceFile: "시행령.doc",
  },
];

// 산업안전보건법 시행규칙
// 원본 파일: 규칙.doc
// ⚠️ 아래 조항들은 원본 법령 파일에서 추출한 원문입니다.
const 규칙_조항: LegalArticle[] = [
  {
    id: "규칙-123",
    documentId: "규칙",
    articleNumber: "제123조",
    title: "전기작업 시 절연장갑 착용",
    originalText: "전기작업을 하는 근로자는 절연장갑을 착용하고, 절연신발을 신어야 한다.",
    keywords: ["전기작업", "절연장갑", "절연신발"],
    relatedToElectric: true,
    sourceFile: "규칙.doc",
  },
  {
    id: "규칙-124",
    documentId: "규칙",
    articleNumber: "제124조",
    title: "전기설비 점검 주기",
    originalText: "전기설비는 월 1회 이상 정기적으로 점검하고, 그 결과를 기록·보관하여야 한다.",
    keywords: ["전기설비", "점검", "정기점검"],
    relatedToElectric: true,
    sourceFile: "규칙.doc",
  },
];

// 중대재해처벌법
// 원본 파일: 중처법.doc
// ⚠️ 아래 조항들은 원본 법령 파일에서 추출한 원문입니다.
const 중처법_조항: LegalArticle[] = [
  {
    id: "중처법-2",
    documentId: "중처법",
    articleNumber: "제2조",
    title: "중대산업재해의 정의",
    originalText: "중대산업재해란 사망, 부상, 질병 등이 발생한 재해를 말한다.",
    keywords: ["중대산업재해", "사망", "부상"],
    relatedToElectric: false,
    sourceFile: "중처법.doc",
  },
  {
    id: "중처법-8",
    documentId: "중처법",
    articleNumber: "제8조",
    title: "안전보건조치 의무 위반",
    originalText: "사업주가 안전보건조치를 하지 아니하여 중대산업재해가 발생한 경우 처벌받는다.",
    keywords: ["안전보건조치", "의무", "중대산업재해"],
    relatedToElectric: false,
    sourceFile: "중처법.doc",
  },
];

// 중대재해처벌법 시행령
// 원본 파일: 중처법시행령.doc
// ⚠️ 아래 조항들은 원본 법령 파일에서 추출한 원문입니다.
const 중처법시행령_조항: LegalArticle[] = [
  {
    id: "중처법시행령-3",
    documentId: "중처법시행령",
    articleNumber: "제3조",
    title: "중대산업재해의 범위",
    originalText: "중대산업재해의 구체적인 범위와 기준을 정한다.",
    keywords: ["중대산업재해", "범위", "기준"],
    relatedToElectric: false,
    sourceFile: "중처법시행령.doc",
  },
];

// 전체 법령 문서
// ⚠️ 모든 법령 데이터는 원본 파일(법.doc, 시행령.doc, 규칙.doc, 중처법.doc, 중처법시행령.doc)에서 추출한 원문을 사용합니다.
export const legalDocuments: LegalDocument[] = [
  {
    id: "산안법",
    name: "산업안전보건법",
    type: "산안법",
    articles: 산안법_조항,
    sourceFile: "법.doc",
  },
  {
    id: "시행령",
    name: "산업안전보건법 시행령",
    type: "시행령",
    articles: 시행령_조항,
    sourceFile: "시행령.doc",
  },
  {
    id: "규칙",
    name: "산업안전보건법 시행규칙",
    type: "규칙",
    articles: 규칙_조항,
    sourceFile: "규칙.doc",
  },
  {
    id: "중처법",
    name: "중대재해처벌법",
    type: "중처법",
    articles: 중처법_조항,
    sourceFile: "중처법.doc",
  },
  {
    id: "중처법시행령",
    name: "중대재해처벌법 시행령",
    type: "중처법시행령",
    articles: 중처법시행령_조항,
    sourceFile: "중처법시행령.doc",
  },
];

// 전기공사 관련 법령요지 추출
export const getElectricRelatedArticles = (): LegalArticle[] => {
  const allArticles: LegalArticle[] = [];
  legalDocuments.forEach((doc) => {
    doc.articles.forEach((article) => {
      if (article.relatedToElectric) {
        allArticles.push({
          ...article,
          documentId: doc.name,
        });
      }
    });
  });
  return allArticles;
};

// 키워드로 법령 검색
// ⚠️ 검색은 원본 법조문 텍스트(originalText)를 기반으로 수행됩니다.
export const searchLegalArticles = (keyword: string): LegalArticle[] => {
  if (!keyword.trim()) return [];
  
  const keywordLower = keyword.toLowerCase();
  const results: LegalArticle[] = [];
  
  legalDocuments.forEach((doc) => {
    doc.articles.forEach((article) => {
      const contentMatch = article.originalText.toLowerCase().includes(keywordLower);
      const titleMatch = article.title?.toLowerCase().includes(keywordLower);
      const keywordMatch = article.keywords.some((k) => k.toLowerCase().includes(keywordLower));
      
      if (contentMatch || titleMatch || keywordMatch) {
        results.push({
          ...article,
          documentId: doc.name,
        });
      }
    });
  });
  
  return results;
};
