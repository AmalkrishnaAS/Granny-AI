export const Title = ({text}: {text: string}) => {
    return (
        <h1 className="scroll-m-24 text-3xl font-extrabold tracking-tight lg:text-5xl">
        <span className="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
          {text} 
        </span>
    </h1>      
    )
}