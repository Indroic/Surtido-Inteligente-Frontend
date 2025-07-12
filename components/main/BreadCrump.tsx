"use client";

import { BreadcrumbItem, Breadcrumbs } from "@heroui/breadcrumbs";
import { useEffect, useState } from "react";
import { Skeleton } from "@heroui/skeleton";
import { ButtonGroup } from "@heroui/button";

import { useAppSelector } from "@/store/hooks";
import { useBreadActions } from "@/context/ActionsContext";

export type BreadcrumbItemProps = {
  id: string;
  label: string;
  href: string;
};

export default function BreadCrump() {
  const [loading, setLoading] = useState(false);
  const { actions } = useBreadActions();

  useEffect(() => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, [useAppSelector((state) => state.bread.items), actions]);

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-center p-5 w-full items-start justify-between">
      <Skeleton className="rounded-md" isLoaded={loading}>
        <Breadcrumbs variant="solid">
          {useAppSelector((state) => state.bread.items).map((item, index) => (
            <BreadcrumbItem key={index} href={item.href}>
              {item.label}
            </BreadcrumbItem>
          ))}
        </Breadcrumbs>
      </Skeleton>
      <Skeleton className="rounded-md" isLoaded={loading}>
        <ButtonGroup>
          {actions ? actions.map((Action: React.ReactElement) => Action) : null}
        </ButtonGroup>
      </Skeleton>
    </div>
  );
}
