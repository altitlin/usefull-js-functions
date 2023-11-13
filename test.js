import React from 'react';
import cn from 'classnames';

import { BaseUIProps } from 'utils/component';
import { buildTestId, getTestStuff } from 'utils/testing';

import { MenuAction, AnchorPoint, ParentCoordinates } from './types';
import { MenuItem } from './menu-item';

import styles from './menu-actions.module.scss';

interface Props extends BaseUIProps {
	anchorPoint: AnchorPoint;
	parentCoordinates: ParentCoordinates;
	menuActions: MenuAction[];
}

const MenuActionsImpl: React.FC<Props> = ({
	menuActions,
	anchorPoint,
	parentCoordinates,
	testId,
	className,
}) => {
	const menuActionsRef = React.useRef<HTMLUListElement | null>(null);

	const isVisibleMenuActions = !!anchorPoint.x;

	React.useEffect(() => {
		if (menuActionsRef && menuActionsRef.current) {
			const { x } = anchorPoint;
			const { left } = parentCoordinates;

			menuActionsRef.current.style.left = `${x - left}px`;
		}
	}, [anchorPoint, parentCoordinates]);

	if (!isVisibleMenuActions) return null;

	return (
		<ul
			{...getTestStuff(testId, 'menu-actions')}
			ref={menuActionsRef}
			className={cn(styles.menuActions, className)}
		>
			{menuActions.map((menuAction) => (
				<MenuItem
					{...menuAction}
					key={menuAction.id}
					testId={buildTestId(testId, `menu-item-${menuAction.id}`)}
					onItem={menuAction.onClick}
				/>
			))}
		</ul>
	);
};

export const MenuActions = React.memo(MenuActionsImpl);
