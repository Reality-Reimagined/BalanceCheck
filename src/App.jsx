import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Account from "components/Account/Account";
import Chains from "components/Chains";
import ERC20Balance from "components/ERC20Balance";
import ERC20Transfers from "components/ERC20Transfers";
import DEX from "components/DEX";
import NFTBalance from "components/NFTBalance";
import Wallet from "components/Wallet";
import { Layout, Tabs } from "antd";
import "antd/dist/antd.css";
import NativeBalance from "components/NativeBalance";
import "./style.css";
import QuickStart from "components/QuickStart";
import Contract from "components/Contract/Contract";
import Text from "antd/lib/typography/Text";
import Ramper from "components/Ramper";
import MenuItems from "./components/MenuItems";



const { Header, Footer } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
const App = ({ isServerInfo }) => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } = useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading) enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout style={{ height: "100vh", overflow: "auto" }}>
      <Router>
        <Header style={styles.header}>
         
          <Logo />
          <MenuItems />
          <div style={styles.headerRight}>
            <Chains />
            
            <NativeBalance />
            <Account />
          </div>
        </Header>

        <div style={styles.content}>
          <Switch>
            <Route exact path="/quickstart">
              <QuickStart isServerInfo={isServerInfo} />
            </Route>
            <Route path="/wallet">
              <Wallet />
            </Route>
            <Route path="/1inch">
              <Tabs defaultActiveKey="1" style={{ alignItems: "center" }}>
                <Tabs.TabPane tab={<span>Ethereum</span>} key="1">
                  <DEX chain="eth" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Binance Smart Chain</span>} key="2">
                  <DEX chain="bsc" />
                </Tabs.TabPane>
                <Tabs.TabPane tab={<span>Polygon</span>} key="3">
                  <DEX chain="polygon" />
                </Tabs.TabPane>
              </Tabs>
            </Route>
            <Route path="/erc20balance">
              <ERC20Balance />
            </Route>
            <Route path="/onramp">
              <Ramper />
            </Route>
            <Route path="/erc20transfers">
              <ERC20Transfers />
            </Route>
            <Route path="/nftBalance">
              <NFTBalance />
            </Route>
            <Route path="/contract">
              <Contract />
            </Route>
            <Route path="/">
              <Redirect to="/nftBalance" />
            </Route>
            <Route path="/ethereum-boilerplate">
              <Redirect to="/nftBalance" />
            </Route>
            <Route path="/nonauthenticated">
              <>Please login using the "Authenticate" button</>
            </Route>
          </Switch>
        </div>
      </Router>
      <Footer style={{ textAlign: "center" }}>
        <Text style={{ display: "block" }}>
          ⭐️ Visit Our Main {" "}
          <a href="https://realityreimagined.store" target="_blank" rel="noopener noreferrer">
          Website
          </a>
          
        </Text>

        <Text style={{ display: "block" }}>
          🙋 Do you want to mint a Reality Reimagined {""}
          <a target="_blank" rel="noopener noreferrer" href="https://realityreimagined.space">
            NFT
          </a>
        </Text>

        
      </Footer>
    </Layout>
  );
};

export const Logo = () => (
  <div style={{ display: "flex" }}>
    <svg width="60" height="38" viewBox="0 0 50 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0.000000,818.000000) scale(0.100000,-0.100000)"
    fill="#000000" stroke="none">
    <path d="M4077 7618 c-463 -309 -1472 -980 -2242 -1491 -770 -510 -1413 -942
    -1430 -958 l-30 -29 -3 -1036 c-2 -931 -1 -1039 14 -1069 12 -27 66 -67 262
-196 136 -90 1149 -764 2252 -1498 1103 -734 2014 -1335 2025 -1335 22 0 4445
2940 4510 2997 l40 36 3 1039 2 1039 -22 33 c-17 24 -467 328 -1593 1076 -863
573 -1571 1047 -1573 1053 -2 6 7 24 21 41 46 54 101 227 152 479 14 68 25
125 25 127 0 4 -119 -39 -230 -83 -97 -38 -239 -107 -290 -142 -25 -16 -64
-53 -87 -80 l-40 -50 -444 297 c-244 164 -452 301 -462 305 -13 5 -247 -146
-860 -555z m2153 141 c0 -5 -35 -34 -77 -66 -94 -68 -183 -143 -183 -152 0 -4
23 -13 51 -20 132 -34 194 -176 127 -290 l-20 -35 24 -17 23 -18 -26 -28 c-15
-15 -108 -116 -208 -223 -100 -107 -185 -196 -189 -197 -4 -2 -67 49 -141 112
-74 63 -138 112 -141 108 -77 -93 -114 -132 -121 -127 -22 13 -7 67 32 120 30
41 38 58 30 68 -14 17 356 495 381 493 11 -1 42 28 81 73 68 81 134 127 265
185 73 32 92 35 92 14z m-2075 -819 c4 -13 15 -20 31 -20 27 0 33 -17 9 -26
-9 -4 -15 -19 -15 -36 0 -25 -3 -29 -17 -23 -23 9 -33 9 -56 0 -15 -6 -17 -4
-12 17 4 16 1 29 -9 37 -23 19 -20 31 8 31 16 0 27 7 31 20 3 11 10 20 15 20
5 0 12 -9 15 -20z m1203 11 c-1 -4 -64 -87 -138 -183 -108 -140 -137 -172
-147 -162 -23 23 -78 51 -130 69 -30 9 -53 23 -53 30 0 35 135 152 232 201 27
14 72 31 101 39 58 15 140 20 135 6z m362 -372 c0 -87 -22 -175 -63 -256 -40
-78 -108 -173 -124 -173 -7 0 -24 24 -39 53 -14 28 -42 69 -62 89 l-35 37 33
38 c98 111 274 292 282 287 4 -3 8 -37 8 -75z m433 5 c-6 -17 -30 -19 -35 -2
-3 7 0 18 6 24 14 15 37 -2 29 -22z m-992 -211 l60 -48 -5 -80 c-8 -126 -52
-243 -155 -413 -163 -268 -226 -497 -201 -725 33 -289 127 -488 480 -1022 212
-319 308 -481 410 -690 145 -297 240 -570 287 -825 19 -104 24 -431 7 -483
l-9 -28 -354 226 c-195 124 -365 225 -377 225 -12 0 -31 3 -41 7 -16 6 -15 8
7 14 24 7 24 7 -8 14 -19 4 -36 14 -39 21 -2 7 -15 20 -28 28 -24 16 -24 15
-67 -65 -47 -89 -178 -255 -209 -264 -14 -5 -83 34 -248 139 -126 80 -232 146
-236 146 -5 0 -16 7 -26 16 -10 9 -157 105 -328 214 l-310 197 77 7 c172 16
342 58 414 104 l29 19 -223 142 c-211 135 -225 142 -263 137 -36 -4 -49 1
-125 49 -47 30 -77 55 -67 55 10 0 15 5 12 10 -3 6 2 10 12 10 32 0 -8 20 -42
20 l-30 1 25 17 c53 35 141 127 179 186 95 145 130 286 138 546 5 178 3 229
-32 610 -19 215 -19 472 0 583 29 169 85 268 234 418 190 190 463 345 841 480
74 26 139 48 143 48 5 1 36 -20 68 -46z m1432 -532 c-2 -10 -11 -18 -18 -18
-19 0 -29 28 -14 38 19 11 37 0 32 -20z m1706 -504 c565 -379 600 -404 633
-455 42 -63 50 -101 55 -262 10 -302 -27 -423 -154 -499 -17 -11 -17 -11 1
-22 83 -50 130 -132 146 -251 15 -113 13 -531 -2 -550 -20 -25 -450 -308 -460
-302 -4 3 -8 192 -8 420 0 267 -4 422 -10 435 -10 17 -22 19 -135 19 l-125 0
-1 -522 c0 -288 -3 -531 -7 -540 -9 -22 -430 -300 -443 -292 -10 6 -13 3137
-2 3147 3 4 8 7 10 7 3 0 228 -150 502 -333z m-6241 -364 l-3 -688 -24 -53
c-13 -30 -42 -69 -67 -91 l-43 -38 38 -31 c22 -18 52 -57 68 -89 l28 -58 3
-708 3 -708 -28 16 c-16 9 -120 78 -233 153 l-205 137 -2 515 c-3 611 14 550
-152 550 -70 0 -111 -4 -119 -12 -9 -9 -12 -119 -12 -435 0 -233 -2 -423 -5
-423 -9 0 -398 261 -423 283 l-22 20 0 772 c0 601 3 775 13 788 15 21 1157
785 1175 786 10 1 12 -134 10 -686z m3845 361 c-6 -17 -30 -19 -35 -2 -3 7 0
18 6 24 14 15 37 -2 29 -22z m-3003 -264 c23 0 26 -13 6 -29 -8 -7 -11 -22 -8
-38 4 -23 2 -25 -14 -18 -10 4 -23 7 -29 7 -5 0 -19 -3 -29 -7 -16 -7 -18 -5
-14 18 3 16 0 31 -8 38 -20 16 -17 29 6 29 12 0 25 10 32 26 l12 25 13 -25 c8
-15 22 -26 33 -26z m3998 -146 c2 -14 -3 -20 -18 -20 -12 0 -20 7 -20 16 0 35
33 38 38 4z m-1291 -464 c26 0 26 0 7 -21 -10 -12 -17 -32 -16 -45 3 -22 2
-23 -21 -13 -18 8 -30 8 -47 -1 -20 -11 -21 -10 -18 13 1 14 -5 34 -16 46 -19
21 -19 21 8 21 19 0 30 7 38 26 l12 25 13 -25 c9 -18 22 -26 40 -26z m-2074
-416 c-6 -17 -30 -19 -35 -2 -3 7 0 18 6 24 14 15 37 -2 29 -22z m-148 -2000
c-17 -13 -20 -13 -26 3 -9 27 12 45 31 27 13 -14 13 -17 -5 -30z m2493 -222
c17 -11 6 -39 -18 -45 -13 -3 -19 2 -23 19 -3 20 4 31 23 33 3 0 11 -3 18 -7z
m-713 -772 c4 -13 15 -20 32 -20 25 0 25 -1 10 -18 -10 -10 -17 -31 -17 -46 0
-24 -2 -25 -20 -16 -14 7 -26 8 -39 0 -27 -14 -29 -13 -24 13 3 14 -2 29 -11
36 -23 19 -20 31 8 31 16 0 27 7 31 20 3 11 10 20 15 20 5 0 12 -9 15 -20z"/>
<path d="M5926 7480 c-63 -19 -106 -83 -106 -157 0 -157 196 -212 293 -82 52
70 20 185 -63 227 -46 23 -76 26 -124 12z m110 -36 c34 -17 74 -69 74 -98 0
-12 -9 -16 -33 -16 -19 0 -68 -3 -109 -6 l-76 -7 -3 47 c-3 37 0 51 16 65 38
35 80 39 131 15z"/>
<path d="M8240 4541 l0 -311 128 0 c112 0 131 2 145 18 15 16 17 46 17 208 l0
190 -27 26 c-23 20 -195 139 -250 172 -10 6 -13 -58 -13 -303z"/>
<path d="M1443 4729 c-59 -39 -114 -78 -120 -87 -14 -17 -19 -354 -7 -386 5
-13 27 -16 134 -16 110 0 129 2 143 18 15 16 17 49 17 261 0 249 -4 281 -39
281 -11 0 -68 -32 -128 -71z"/>
</g>
</svg>
  </div>
);

export default App;
