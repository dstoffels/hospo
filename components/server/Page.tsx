import * as React from 'react';
import Column from './Column';

export type PageProps = React.PropsWithChildren & { className?: string };

const Page: React.FC<PageProps> = async ({ children, className }) => {
	return (
		<Column className="items-center p-2 mb-14">
			<Column className={`max-w-xl w-full ${className || ''}`}>{children}</Column>
		</Column>
	);
};

export default Page;
