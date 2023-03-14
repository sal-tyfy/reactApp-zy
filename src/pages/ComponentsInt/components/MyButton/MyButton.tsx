export const MyButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button type="button" className="btn">
      {children}
    </button>
  );
};
