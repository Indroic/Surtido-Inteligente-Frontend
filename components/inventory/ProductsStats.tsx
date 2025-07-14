import ResumeComponent from "@/components/inventory/ResumeComponent";
import ResumeItem from "@/components/inventory/ResumeItem";
import { ProductStatsInterface } from "@/types/products";
import { IconPackage, IconTags, IconPackages, IconVersions } from "@tabler/icons-react";
import useSWR from "swr";

export default function StatsComponent() {
  const { data, isLoading, error } = useSWR<ProductStatsInterface>(
    "/api/inventory/products/stats"
  );
  return (
    <ResumeComponent>
      <ResumeItem
        title="Total de Productos Base"
        content={data?.total_products.toString() || "0"}
        loading={isLoading}
        Icon={IconPackage}
      />
      <ResumeItem
        title="Categorias"
        content={data?.total_categories.toString() || "0"}
        loading={isLoading}
        Icon={IconTags}
      />
      <ResumeItem
        title="Variantes"
        content={data?.total_variants.toString() || "0"}
        loading={isLoading}
        Icon={IconVersions}
      />
      <ResumeItem
        title="Stock"
        content={data?.total_stock.toString() || "0"}
        loading={isLoading}
        Icon={IconPackages}
      />
    </ResumeComponent>
  );
}
