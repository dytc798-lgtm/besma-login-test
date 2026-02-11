// 재사용 가능한 필터 패널 컴포넌트

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterPanelProps {
  title?: string;
  filters: Array<{
    label: string;
    value: string;
    onChange: (value: string) => void;
    options?: FilterOption[];
    type?: "select" | "search";
    placeholder?: string;
  }>;
}

export function FilterPanel({ title = "필터 및 검색", filters }: FilterPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`grid grid-cols-1 ${filters.length === 2 ? 'md:grid-cols-2' : filters.length === 3 ? 'md:grid-cols-3' : filters.length === 4 ? 'md:grid-cols-4' : 'md:grid-cols-2'} gap-4`}>
          {filters.map((filter, index) => (
            <div key={index}>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                {filter.label}
              </label>
              {filter.type === "search" ? (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={filter.placeholder || "검색..."}
                    value={filter.value}
                    onChange={(e) => filter.onChange(e.target.value)}
                    className="pl-10"
                  />
                </div>
              ) : (
                <select
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  className="w-full p-2 border rounded-lg"
                >
                  {filter.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
