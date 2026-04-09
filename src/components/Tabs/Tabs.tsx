'use client';

import classNames from 'classnames';
import { type KeyboardEvent, useMemo, useRef, useState } from 'react';
import { COMPONENT_IDS } from '@/constants';
import { createUniqueId } from '@/helpers/createUniqueId';
import styles from './Tabs.module.scss';
import type { TabSection, TabsProps } from './Tabs.type';

export const Tabs = (props: TabsProps) => {
  const {
    id: _id,
    className: _className,
    sections,
    selectedIndex: _selectedIndex = 0,
    dataTestId
  } = props;

  const internalId = useMemo(() => createUniqueId(), [createUniqueId]);
  const [selectedIndex, setSelectedIndex] = useState<number>(_selectedIndex);
  const tabsRef = useRef<Array<HTMLButtonElement>>([]);
  const panelRef = useRef<Array<HTMLDivElement>>([]);

  const id = _id || internalId;
  const className = classNames(COMPONENT_IDS.Tabs, styles.wrapper, _className);

  const accessibleName = 'My tab list';

  const handleTabClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    let newIndex = selectedIndex;

    if (event.key === 'ArrowLeft') {
      newIndex = selectedIndex === 0 ? sections.length - 1 : selectedIndex - 1;
    } else if (event.key === 'ArrowRight') {
      newIndex = selectedIndex === sections.length - 1 ? 0 : selectedIndex + 1;
    }
    tabsRef?.current[newIndex].focus();

    setSelectedIndex(newIndex);
  };

  return (
    <div {...{ id, className }} data-testid={dataTestId}>
      {sections.length > 0 && (
        <>
          <div role="tablist" aria-label={accessibleName} className={styles.tablist}>
            {sections.map((section: TabSection, index: number) => {
              const { title } = section;
              const tabId = `${id}__tab-${index}`;
              const panelId = `${id}__panel-${index}`;
              const isTabSelected = selectedIndex === index;
              const tabClassName = classNames(styles.tab, {
                [styles['is-selected']]: isTabSelected
              });

              return (
                <button
                  type="button"
                  key={tabId}
                  role="tab"
                  id={tabId}
                  aria-controls={panelId}
                  aria-selected={isTabSelected}
                  tabIndex={isTabSelected ? 0 : -1}
                  ref={(el: HTMLButtonElement) => {
                    tabsRef.current[index] = el;
                  }}
                  onClick={() => handleTabClick(index)}
                  onKeyDown={(event: KeyboardEvent<HTMLButtonElement>) =>
                    handleKeyDown(event)
                  }
                  className={tabClassName}
                >
                  {title}
                </button>
              );
            })}
          </div>

          {sections.map((section: TabSection, index: number) => {
            const tabId = `${id}__tab-${index}`;
            const panelId = `${id}__panel-${index}`;
            const { children } = section;

            return (
              <div
                key={panelId}
                id={panelId}
                role="tabpanel"
                aria-labelledby={tabId}
                hidden={selectedIndex !== index}
                tabIndex={selectedIndex === index ? 0 : -1}
                ref={(el: HTMLDivElement) => {
                  panelRef.current[index] = el;
                }}
                className={styles.tabpanel}
              >
                {children}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
