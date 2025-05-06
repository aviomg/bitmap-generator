

import { Card, CardContent,CardDescription, CardTitle, CardHeader } from "@/components/ui/card";

export default function About(){
    return(<div className="max-w-[1000] mx-auto text-center p-5 flex flex-col gap-y-0 mb-20 ">
        <h1 className="text-3xl font-bold mb-5 text-primary">How it Works </h1>
        <h2 className="text-xl mb-5 text-primary">This bitmap generator is a tool designed to help you when you are on parts b and c of the final project</h2>
       
        <div className="flex flex-col gap-y-5">
        <Card className="mx-auto bg-transparent">
                <CardContent className="text-accent-foreground gap-y-3 flex flex-col">    
                <p>After completing part A of the project, you should have [Nchars] characters that you defined in your C demo (using Dr. Singh's template and helper procs.c file).</p>
                <p>For the purposes of the C demo, you used simple characters on a single character background, but these characters actually correspond to your sprites, each of which are stored as 256 lines of 3-digit hex codes. You will store a concatenated file of all of your sprites as your bmem.mem file.  </p> 
                <p>These sprites are referenced in your smem.mem, as well as your assembly code, via their respective indices.</p>
                </CardContent>
        </Card>
    <Card className="" >   
<CardContent>
   <CardHeader><CardTitle>Steps to take:</CardTitle></CardHeader>
    <ul className="flex flex-col gap-y-6 text-accent-foreground font-mono text-sm">
        <li>1. Create new sprites on the homepage using the pixel art grid, and click "Add to saved sprites" to save the sprite/character.</li>
        <li>2. Create as many sprites as you want/as you defined in your C demo. View, edit, delete, and/or reorder them on the My Sprites page. The sprite data is saved in your browser's localStorage, so it will persist on page reload and as long as you don't clear the site data. They probably won't stay forever though, so don't forget to generate and save your bmem file when you are done.</li>
        <li>3. When you are ready to generate your bmem.mem file, click "generate bmem from sprites" on the sprites page. This will
            produce the concatenation of all of the sprites you've created, in the order that they are shown on the page.
        </li>
        <li>4. If you want to change some of your sprites later (e.g., after viewing them on the emulator or the board), go to the My Sprites page and paste in your bmem file to render your sprites. You can edit them and then re-generate your bmem</li>
        <li>5. That's it! I hope that this website makes it easier to create, manipulate, and work with your sprites for the final project. Good luck!</li>
    </ul>
</CardContent>
        </Card>
        <p className="mb-4">by Avi Kumar</p>
        </div>
    </div>)

}