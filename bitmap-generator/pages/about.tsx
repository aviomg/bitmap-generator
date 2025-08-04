

import { Card, CardContent,CardDescription, CardTitle, CardHeader } from "@/components/ui/card";
import { CircleSmall, MoveRight } from "lucide-react";
import Link from "next/link";

export default function About(){
    return(<div className="max-w-[1000] mx-auto text-center p-5 flex flex-col gap-y-0 mb-20 ">
        <h1 className="text-3xl font-bold mb-5 text-primary">How it Works </h1>
        <h2 className="text-xl mb-5 text-primary">This bitmap generator is a tool designed to help you when you are on parts b and c of the final project.</h2>
       
        <div className="flex flex-col gap-y-5">
        <Card className="mx-auto bg-transparent">
                <CardContent className="text-accent-foreground gap-y-3 flex flex-col">    
                <p>After completing part A of the project, you should have [Nchars] characters that you defined in your C demo (using Dr. Singh's template and helper <span className="font-mono-code bg-gray-200 rounded-md text-[#0d0d0d] text-sm font-medium pt-[0.15rem] pb-[0.15rem] pl-[0.3rem] pr-[0.3rem]">procs.c</span> file).</p>
                <p>For the purposes of the C demo, you used simple characters on a single character background, but these characters actually correspond to your sprites, each of which are stored as 256 lines of 3-digit hex codes. You will store a concatenated file of all of your sprites as your <span className="font-mono-code bg-gray-200 rounded-md text-[#0d0d0d] text-sm font-medium pt-[0.15rem] pb-[0.15rem] pl-[0.3rem] pr-[0.3rem]">bmem.mem</span> in your Vivado project.  </p> 
                <p>These sprites are referenced in your smem.mem, as well as your assembly code, via their respective indices. The indices are important, and your concatenated bmem file must store each sprite at the same index-position that you have defined it at in your C demo. If necessary, click 'reorder sprites' on the "My Sprites" page and put your sprites in the correct order before generating your bmem.</p>
                </CardContent>
                
        </Card>
    <Card className="" >   
<CardContent>
   <CardHeader><CardTitle>Steps to take:</CardTitle></CardHeader>
    <ul className="flex flex-col gap-y-6 text-accent-foreground font-mono text-sm">
        <li>1. Create new sprites on the homepage using the pixel art grid, and click "Add to saved sprites" to save the sprite/character.</li>
        <li>2. Create as many sprites as you want/as you defined in your C demo. View, edit, delete, and/or reorder them on the My Sprites page. The sprite data is saved in your browser's localStorage, so it will persist on page reload and as long as you don't clear the site data. They probably won't stay forever though, and may not save if you close the tab, so don't forget to generate and save your bmem file when you are done.</li>
        <li>3. When you are ready to generate your <span className="font-mono-code bg-gray-200 rounded-md text-[#0d0d0d] text-sm font-medium pt-[0.15rem] pb-[0.15rem] pl-[0.3rem] pr-[0.3rem]">bmem.mem</span>, click "generate bmem from sprites" on the sprites page. This will
            produce the concatenation of all of the sprites you've created, in the order that they are shown on the page.
        </li>
        <li>4. If you want to change some of your sprites later (e.g., after viewing them on the emulator or the board), go to the My Sprites page and simply paste in your bmem file to render your sprites. You can edit them and then re-generate your bmem</li>
        <li>5. That's it! I hope that this website makes it easier to create, manipulate, and work with your sprites for the final project. Good luck!</li>
    </ul>
</CardContent>
        </Card>
    <Card className="mx-auto bg-transparent gap-1">
<CardHeader><CardTitle>Credits:</CardTitle></CardHeader>
<CardContent className="text-accent-foreground gap-y-3 flex flex-col"> 
    <div className="flex flex-row gap-x-2 items-baseline">
        <div> <MoveRight size={16} /></div>
    <p className="text-left">Abraham Post, who developed the initial "Sprite Maker" website application for creating sprites for the COMP541 final project. 
        Much of the logic in this application for creating individual sprites and saving them as hex code files (eg on the homepage) is based off of his work.
        View the original Sprite Maker <span >
            <Link className="text-secondary-dark underline hover:text-secondary" href="https://www.cs.unc.edu/~montek/teaching/Comp541-Spring25/LabProject/abrahampost-spritemaker/" target="_blank">here</Link>
        </span>!</p>
    </div>
    <div className="flex flex-row gap-x-2 items-baseline">
        <div><MoveRight size={16} /></div>
    <p className="text-left">Dr. Montek Singh, who gave me the idea to create this project after having the best time in his COMP 541 course (which I'd recommend to everyone!)</p>

    </div>

</CardContent>
    </Card>
        <p className="mb-4">by Avi Kumar</p>
        </div>
    </div>)

}