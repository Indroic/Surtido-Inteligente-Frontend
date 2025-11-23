import {
  IconPackage,
  IconTags,
  IconPackages,
  IconVersions,
} from "@tabler/icons-react";
import useSWR from "swr";

import ResumeComponent from "@/components/common/resume/ResumeComponent";
import ResumeItem from "@/components/common/resume/ResumeItem";
import { ProductStatsInterface } from "@/types/products";
import { addGetStatsQuery } from "@/helpers/apiStringsPathsHelpers";
import { PRODUCT_BASE_API_URL } from "@/UrlPaths";

export default function StatsComponent() {
  const { data, isLoading } = useSWR<ProductStatsInterface>(
    addGetStatsQuery(PRODUCT_BASE_API_URL),
  );

  return (
    <ResumeComponent>
      <ResumeItem
        Icon={IconPackage}
        content={(data?.total_products || "0").toString()}
        loading={isLoading}
        title="Total de Productos Base"
      />
      <ResumeItem
        Icon={IconTags}
        content={(data?.total_categories || "0").toString()}
        loading={isLoading}
        title="Categorias"
      />
      <ResumeItem
        Icon={IconVersions}
        content={(data?.total_variants || "0").toString()}
        loading={isLoading}
        title="Variantes"
      />
      <ResumeItem
        Icon={IconPackages}
        content={(data?.total_stock || "0").toString()}
        loading={isLoading}
        title="Stock"
      />
    </ResumeComponent>
  );
}
