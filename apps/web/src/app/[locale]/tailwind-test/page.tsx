'use client';

import { useState } from 'react';

export default function TailwindTestPage() {
  const [testResults, setTestResults] = useState({
    pandaCss: false,
    tailwindCss: false,
    gitanimalsComponents: null as string | null
  });

  // PandaCSS 테스트
  const testPandaCss = () => {
    // PandaCSS 스타일이 정상 적용되는지 확인
    const element = document.querySelector('.panda-test');
    if (element) {
      const styles = window.getComputedStyle(element);
      setTestResults(prev => ({ 
        ...prev, 
        pandaCss: styles.backgroundColor !== 'rgba(0, 0, 0, 0)' 
      }));
    }
  };

  // Tailwind CSS 테스트
  const testTailwindCss = () => {
    const element = document.querySelector('.tailwind-test');
    if (element) {
      const styles = window.getComputedStyle(element);
      setTestResults(prev => ({ 
        ...prev, 
        tailwindCss: styles.backgroundColor === 'rgb(59, 130, 246)' // bg-blue-500
      }));
    }
  };

  // GitAnimals 컴포넌트 테스트
  const testGitAnimalsComponents = async () => {
    try {
      const { Button, Card, Badge, cn } = await import('@gitanimals/ui-tailwind');
      setTestResults(prev => ({ ...prev, gitanimalsComponents: 'success' }));
      return { Button, Card, Badge, cn };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      setTestResults(prev => ({ 
        ...prev, 
        gitanimalsComponents: `Error: ${errorMessage}` 
      }));
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* 헤더 */}
        <div className="text-center text-white py-8">
          <h1 className="text-4xl font-bold mb-2">
            PandaCSS + Tailwind CSS 공존 테스트
          </h1>
          <p className="text-blue-100">
            기존 PandaCSS와 새로운 Tailwind CSS가 함께 동작하는지 확인
          </p>
        </div>

        {/* PandaCSS 테스트 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🎨 PandaCSS 테스트 (기존 시스템)
          </h2>
          <div 
            className="panda-test p-4 rounded mb-4"
            style={{
              backgroundColor: '#22c55e',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            PandaCSS 스타일이 적용된 요소 (인라인 스타일로 임시 테스트)
          </div>
          <button
            onClick={testPandaCss}
            className="mb-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            PandaCSS 테스트 실행
          </button>
          <p className="text-sm">
            상태: {testResults.pandaCss ? '✅ 정상 동작' : '⚠️ 테스트 대기 중'}
          </p>
        </div>

        {/* Tailwind CSS 테스트 (스코프 적용) */}
        <div className="tailwind-scope bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            ⚡ Tailwind CSS 테스트 (스코프 적용)
          </h2>
          <div className="tailwind-test bg-blue-500 text-white p-4 rounded mb-4 font-bold">
            Tailwind CSS 스타일이 적용된 요소
          </div>
          <div className="flex gap-2 mb-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">Blue Badge</span>
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Green Badge</span>
            <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">Red Badge</span>
          </div>
          <button
            onClick={testTailwindCss}
            className="mb-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Tailwind CSS 테스트 실행
          </button>
          <p className="text-sm">
            상태: {testResults.tailwindCss ? '✅ 정상 동작' : '⚠️ 테스트 대기 중'}
          </p>
        </div>

        {/* GitAnimals Tailwind 컴포넌트 테스트 */}
        <div className="tailwind-scope bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📦 GitAnimals Tailwind 컴포넌트 테스트
          </h2>
          
          <button
            onClick={testGitAnimalsComponents}
            className="mb-4 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-4 rounded transition-colors"
          >
            GitAnimals 컴포넌트 테스트
          </button>

          {testResults.gitanimalsComponents === null && (
            <p className="text-gray-600">버튼을 클릭하여 컴포넌트를 테스트하세요.</p>
          )}

          {testResults.gitanimalsComponents === 'success' && (
            <div className="space-y-4">
              <p className="text-green-600 font-semibold">✅ GitAnimals 컴포넌트 성공적으로 로드됨!</p>
              <div className="p-4 bg-gray-50 rounded">
                <p className="text-sm text-gray-600 mb-2">사용 가능한 컴포넌트:</p>
                <ul className="text-sm text-gray-700 list-disc list-inside">
                  <li>Button (variants: primary, secondary, ghost, danger)</li>
                  <li>Card, CardHeader, CardContent, CardFooter</li>
                  <li>Badge (variants: default, success, warning, error, info)</li>
                  <li>cn 유틸리티 함수</li>
                </ul>
              </div>
            </div>
          )}

          {testResults.gitanimalsComponents && testResults.gitanimalsComponents !== 'success' && (
            <div className="space-y-2">
              <p className="text-red-600 font-semibold">❌ 컴포넌트 로드 실패</p>
              <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto border">
                {testResults.gitanimalsComponents}
              </pre>
            </div>
          )}
        </div>

        {/* 공존 상태 요약 */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📊 시스템 공존 상태
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">🎨 PandaCSS</h3>
              <p className="text-sm text-gray-600">기존 시스템, 전역 적용</p>
              <p className="text-xs mt-1">
                상태: {testResults.pandaCss ? '🟢 활성' : '🔴 비활성'}
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-2">⚡ Tailwind CSS</h3>
              <p className="text-sm text-gray-600">.tailwind-scope 내에서만 적용</p>
              <p className="text-xs mt-1">
                상태: {testResults.tailwindCss ? '🟢 활성' : '🔴 비활성'}
              </p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">💡 사용 가이드</h4>
            <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
              <li><strong>PandaCSS</strong>: 기존 컴포넌트에서 계속 사용 (css prop, styled 함수)</li>
              <li><strong>Tailwind</strong>: 새로운 컴포넌트는 .tailwind-scope 내에서 사용</li>
              <li><strong>점진적 마이그레이션</strong>: 필요에 따라 기존 컴포넌트를 Tailwind로 전환</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}