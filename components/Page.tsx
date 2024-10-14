import * as React from 'react';

export type PageProps = React.PropsWithChildren & { className?: string };

const Page: React.FC<PageProps> = async ({ children, className }) => {
	return (
		<div className="flex-grow flex flex-col items-center p-2">
			<div className={`max-w-xl w-full ${className}`}>{children}</div>
		</div>
	);
};

export default Page;
