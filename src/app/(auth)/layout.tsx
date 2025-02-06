const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return <div
    style={{
        backgroundImage: "url(/bg.jpg)",
    
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
    }}
    className="flex items-center justify-center"
>
        {children}
    </div>
}