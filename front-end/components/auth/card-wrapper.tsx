"use client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { BackButton } from "./back-button";
import { Header } from "./header";

interface CardWrapperProps {
  children: React.ReactNode;
  title : string;
  headerLabel: string;
  backButtonLabel: string;
  backButtiHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtiHref,
  title,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} title={title}/>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton 
        href={backButtiHref}
        label={backButtonLabel}
        ></BackButton>
      </CardFooter>
    </Card>
  );
};
