import * as React from 'react';

export type PageProps = React.PropsWithChildren;

const Page: React.FC<PageProps> = async ({ children }) => {
	return <div className="flex-grow flex flex-col p-2">{children}</div>;
};

export default Page;
