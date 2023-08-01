import Loader from "Loader/Loader";
import ConnectionCheck from "ConnectionCheck/ConnectionCheck";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const NftList = lazy(() =>
	import("page/NftList")
);

const CreateNft = lazy(() =>
	import("components/nft/CreateNft")
);

const NftDetails = lazy(() =>
	import("components/nft/NftDetails")
);
const Profile = lazy(()=>
	import('components/nft/Profile')
)
const ListonUI = lazy(()=>
	import('components/nft/ListonUI')
)
const ListnftForSale = lazy(() =>
	import("components/nft/ListnftForSale")
);

function App() {
	return (
		<Suspense fallback={<Loader />}>
			<ConnectionCheck>
				<Routes>
					<Route exact path="/" element={<NftList />} />
					<Route path="/createnft" element={<CreateNft/>} />
					<Route path="/details" element={<NftDetails/>} />
					<Route path="/profile" element={<Profile/>}></Route>
					<Route path="/listednft" element={<ListonUI/>}></Route>
					<Route exact path="/listnftforsale" element={<ListnftForSale></ListnftForSale>} />

				</Routes>
			</ConnectionCheck>
		</Suspense>
	);
}

export default App;
