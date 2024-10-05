const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex justify-center items-center bg-gradient-to-br from-sky-500 to-blue-500 p-6">
        {children}
    </div>
  );
};

export default AuthLayout;
