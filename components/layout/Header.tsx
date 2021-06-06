import Link from 'next/link';
import React from 'react';
import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';

export default function Header() {
  return (
    <>
      <AppBar id="AppBar" positionMode="sticky">
        {/*<AppBarSection>
          <button className="k-button k-button-clear">
            <Link href="/"><span className="k-icon k-i-menu" /></Link>
          </button>
        </AppBarSection>*/}
        <AppBarSpacer style={{ width: 4 }} />
        <AppBarSection>
          <h1 className="title"><Link href="/">Blossom Hill Crafts</Link></h1>
        </AppBarSection>
        <AppBarSpacer style={{ width: 32 }} />
        <AppBarSection>
          <ul>
            <li><Link href="/cart">Cart</Link></li>
            <li><Link href="/product">Products</Link></li>
            <li><Link href="/supplier">Suppliers</Link></li>
          </ul>
        </AppBarSection>
      </AppBar>
      <style>{`
                .title {
                    font-size: 18px;
                    margin: 0;
                }
                .k-appbar-section ul {
                    font-size: 16px;
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                }
                .k-appbar-section li {
                    margin: 0 30px;
                }
                .k-appbar-section li:hover {
                    cursor: pointer;
                    color: #84cef1;
                }
                .k-appbar-section {
                  display: flex;
                }
                .k-badge-container {
                    margin-right: 8px;
                }
            `}</style>
    </>
  );
}
