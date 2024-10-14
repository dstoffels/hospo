import * as React from 'react';

export type ColumnProps = React.PropsWithChildren & {
	className?: string;
};

const Column: React.FC<ColumnProps> = async ({ children, className }) => {
	return <div className={`flex flex-col flex-grow ${className}`}>{children}</div>;
};

export default Column;
