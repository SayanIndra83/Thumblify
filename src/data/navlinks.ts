import { INavLink } from "@/dataTypes";

// for normal viwers
export const navlinks1: INavLink[] = [
    { name: "Home", href: "/" },
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Pricing", href: "#pricing" },
    { name: "Connect", href: "#connect" },
];
// for authinticated users
export const navlinks2: INavLink[] = [
    { name: "Home", href: "/" },
    {name: "My Generations", href: "/user/my-generations"},
    {name: "Generate", href: "/user/generate"},
    { name: "Pricing", href: "#pricing" },
    { name: "Connect", href: "#connect" },
];