import * as React from 'react';

export type PageProps = React.PropsWithChildren;

const Page: React.FC<PageProps> = async ({ children }) => {
	return (
		<div className="flex-grow flex flex-col items-center p-2">
			<div className="max-w-xl w-full">{children}</div>
		</div>
	);
};

export default Page;
