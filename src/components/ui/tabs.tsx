"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"
import { TabValue } from "@/app/(home)/components/featuresAndTabs/data"

const Tabs = TabsPrimitive.Root

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {
  hasIcon?: boolean;
}


const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center rounded-full bg-white  border-[6px] border-[#F5F3FB] ",
      {
        "p-1": !props.hasIcon,
        "px-1 py-0.5": props.hasIcon,
      },
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName



export interface TriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  hasIcon?: boolean;
}


const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TriggerProps
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center md:text-lg whitespace-nowrap rounded-full px-3 sm:px-10 font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=inactive]:text-opacity-70",
      {
        "data-[state=active]:bg-blue-300/40": props.value === "supplier" || props.value === TabValue.zift,
        "data-[state=active]:bg-grey-400/40": props.value === "agency" || props.value === TabValue.unifyrPlus,
        "data-[state=active]:bg-green-300/70": props.value === "partner" || props.value === TabValue.unifyrPro,
        "py-1.5": props.hasIcon,
        "py-2": !props.hasIcon,
      },
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
