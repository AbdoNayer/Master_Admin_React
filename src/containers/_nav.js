import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Master Data"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Organizations",
    to: "/organizations/Organizations",
    icon: "cil-user",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Plans",
    to: "/plans/Plans",
    icon: "cil-grid",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Site"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Subscription Requests",
    to: "/",
    icon: "cil-share",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Home Page",
    to: "/",
    icon: "cil-home",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Partners",
    to: "/",
    icon: "cil-user",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Capabilities",
    to: "/",
    icon: "cil-settings",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Testimonials",
    to: "/",
    icon: "cil-people",
  },
  {
    _tag: "CSidebarNavItem",
    name: "About Us",
    to: "/",
    icon: "cil-info-alt",
  },
  {
    _tag: "CSidebarNavItem",
    name: "News",
    to: "/",
    icon: "cil-globe",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Contact Messages",
    to: "/",
    icon: "cil-phone",
  },
  
];

export default _nav;
