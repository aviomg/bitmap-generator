import { Canvas } from "@/components/canvas";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pipette } from "lucide-react";
import { useState } from "react";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
import Link from "next/link";
  

export default function Home(){

    const [activeColor, setActiveColor] = useState<string>("#ffffff");
    const [selecting, setSelecting] = useState<boolean>(false);


    return(<div className="max-w-[700px] mx-auto text-center p-5 flex flex-col gap-y-0 ">
			<h1 className="text-3xl font-bold ">16x16 Sprite Generator for Comp 541</h1>
            <div className="flex flex-row  ">
            <Canvas  editpage={false}/>   
         
            </div>
		</div>

		
    )
}
