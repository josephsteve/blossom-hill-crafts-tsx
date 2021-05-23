import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';
import { AppBar, AppBarSection, AppBarSpacer } from '@progress/kendo-react-layout';

export default function Header() {
  return (
    <>
      <Box display="flex" flexDirection="column" width="full" maxWidth="1160px" margin="0 auto" >
        <AppBar id="AppBar">
          <AppBarSection>
            <button className="k-button k-button-clear">
              <Link href="/"><span className="k-icon k-i-menu" /></Link>
            </button>
          </AppBarSection>
          <AppBarSpacer style={{ width: 4 }} />
          <AppBarSection>
            <h1 className="title">Blossom Hill Crafts</h1>
          </AppBarSection>
          <AppBarSpacer style={{ width: 32 }} />
          <AppBarSection>
            <ul>
              <li><Link href="/product">Products</Link></li>
              <li><Link href="/supplier">Suppliers</Link></li>
            </ul>
          </AppBarSection>
        </AppBar>
      </Box>
      <style>{`
                body {
                    background: #dfdfdf;
                }
                .title {
                    font-size: 18px;
                    margin: 0;
                }
                ul {
                    font-size: 16px;
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                }
                li {
                    margin: 0 20px;
                }
                li:hover {
                    cursor: pointer;
                    color: #84cef1;
                }
                .k-button {
                    padding: 0;
                }
                .k-badge-container {
                    margin-right: 8px;
                }
            `}</style>
    </>
  );
}
