export function Canvas(){
    const gridsize=16;
    // <div className="w-4/5 block mx-auto overflow-auto"></div>;
    return(
        <div className="overflow-auto mx-auto ml-5">
            {[...Array(gridsize)].map((_, rowIndex) => (
                <div key={rowIndex} className="ml-5 flex flex-row mx-auto overflow-auto">
                      {[...Array(gridsize)].map((_, colIndex) => (
                        <div key={colIndex} className=" w-[28px] h-[28px] border" /> 
                      ))}
                    </div>
            ))}
        </div>
    )

}