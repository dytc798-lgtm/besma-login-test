/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // 빌드 시 useSearchParams를 사용하는 페이지는 동적 렌더링으로 처리
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

module.exports = nextConfig
