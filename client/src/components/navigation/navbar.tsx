import { useState } from "react";
import { Menu } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import Container from "@/components/common/container";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet";
import LanguageSwitcher from "../common/language-switcher";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Blogs", href: "/blogs" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/60 backdrop-blur-xl transition-colors duration-300">
            <Container>
                <nav className="flex h-20 items-center justify-between">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="group text-xl font-bold tracking-tight text-white transition duration-300"
                    >
                        Quasim
                        <span className="text-emerald-500 transition-all duration-300 group-hover:pl-0.5">
                            .
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center gap-2 md:flex">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.href}
                                to={link.href}
                                className={({ isActive }) => `
                                    relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md
                                    ${
                                        isActive
                                            ? "text-white bg-white/5"
                                            : "text-zinc-400 hover:text-white hover:bg-white/5"
                                    }
                                `}
                            >
                                {({ isActive }) => (
                                    <>
                                        {link.label}
                                        {isActive && (
                                            <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-emerald-500 rounded-full" />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                        <LanguageSwitcher />
                    </div>

                    {/* Mobile Navigation */}
                    <div className="md:hidden">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    className="text-zinc-400 hover:text-white hover:bg-white/10"
                                    aria-label="Toggle Menu"
                                >
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>

                            <SheetContent
                                side="right"
                                className="w-[320px] border-l border-white/10 bg-zinc-950 backdrop-blur-xl p-6 text-white"
                            >
                                {/* SheetTitle keeps Radix UI accessible and clears console errors */}
                                <SheetTitle className="text-left text-xl font-bold tracking-tight text-white">
                                    Quasim
                                    <span className="text-emerald-500">.</span>
                                </SheetTitle>

                                <div className="mt-10 flex flex-col gap-2">
                                    {navLinks.map((link) => (
                                        <NavLink
                                            key={link.href}
                                            to={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={({ isActive }) => `
                                                flex w-full items-center py-3 px-4 rounded-lg text-base font-medium transition-all
                                                ${
                                                    isActive
                                                        ? "bg-white/10 text-white font-semibold"
                                                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                                                }
                                            `}
                                        >
                                            {link.label}
                                        </NavLink>
                                    ))}
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </nav>
            </Container>
        </header>
    );
};

export default Navbar;
