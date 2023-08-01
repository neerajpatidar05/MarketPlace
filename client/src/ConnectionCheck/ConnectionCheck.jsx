import { Box } from "@material-ui/core";
import { useWeb3React } from "@web3-react/core";
import { SUPPOTED_CHAINID } from "constant";
import { isMetaMaskInstalled } from "utils";

const ConnectionCheck = ({ children }) => {
	const { chainId, active } = useWeb3React();
	if (!isMetaMaskInstalled()) {
		return (
			<Box sx={{ margin: 5 }}>
				<div className="gamfi-footer-section">
					<div
						style={{ width: "1200px" }}
						className="footer-cta-area text-center active-shape hover-shape-inner"
					>
						<h2 className="title mb-15">
							Please Install Metamask
							<br />
						</h2>
						<div className="dsc mb-40 md-mb-30">
							<a
								href="https://metamask.io/download/"
								target="_blank"
							>
								Click hear to install metamask
							</a>
						</div>
						<span className="border-shadow shadow-1" />
						<span className="border-shadow shadow-2" />
						<span className="border-shadow shadow-3" />
						<span className="border-shadow shadow-4" />
						<span className="hover-shape-bg hover_shape1" />
						<span className="hover-shape-bg hover_shape2" />
						<span className="hover-shape-bg hover_shape3" />
					</div>
				</div>
			</Box>
		);
	}
	return (
		<>
			{active && SUPPOTED_CHAINID.includes(chainId) && <>{children}</>}
			{active && !SUPPOTED_CHAINID.includes(chainId) && (
				<Box sx={{ margin: 5 }}>
					<div className="gamfi-footer-section">
						<div
							style={{ width: "1200px" }}
							className="footer-cta-area text-center active-shape hover-shape-inner"
						>
							<h2 className="title mb-15">
								Select diffrent chain
								<br />
							</h2>
							<div className="dsc mb-40 md-mb-30">
								{`Supported chains is ${SUPPOTED_CHAINID?.join(
									","
								)}`}
							</div>
							{/* <Link to="/ido-apply"> */}
							{/* <Link to="/ido-apply">
                        <a
                            className="banner-btn wow fadeInUp black-shape"
                            data-wow-delay="0.3s"
                            data-wow-duration="0.5s"
                        >
                            <span className="btn-text">
                                Apply For IGO
                            </span>
                            <span className="hover-shape1" />
                            <span className="hover-shape2" />
                            <span className="hover-shape3" />
                        </a>
                    </Link> */}
							{/* </Link> */}
							<span className="border-shadow shadow-1" />
							<span className="border-shadow shadow-2" />
							<span className="border-shadow shadow-3" />
							<span className="border-shadow shadow-4" />
							<span className="hover-shape-bg hover_shape1" />
							<span className="hover-shape-bg hover_shape2" />
							<span className="hover-shape-bg hover_shape3" />
						</div>
					</div>
				</Box>
			)}
			{!active && (
				<Box sx={{ margin: 5 }}>
					<div className="gamfi-footer-section">
						<div
							style={{ width: "1200px" }}
							className="footer-cta-area text-center active-shape hover-shape-inner"
						>
							<h2 className="title mb-15">
								Connect your wallate
								<br />
							</h2>
							<div className="dsc mb-40 md-mb-30">
								please connect your web3 wallate
							</div>
							{/* <Link to="/ido-apply"> */}
							{/* <Link to="/ido-apply">
                            <a
                                className="banner-btn wow fadeInUp black-shape"
                                data-wow-delay="0.3s"
                                data-wow-duration="0.5s"
                            >
                                <span className="btn-text">
                                    Apply For IGO
                                </span>
                                <span className="hover-shape1" />
                                <span className="hover-shape2" />
                                <span className="hover-shape3" />
                            </a>
                        </Link> */}
							{/* </Link> */}
							<span className="border-shadow shadow-1" />
							<span className="border-shadow shadow-2" />
							<span className="border-shadow shadow-3" />
							<span className="border-shadow shadow-4" />
							<span className="hover-shape-bg hover_shape1" />
							<span className="hover-shape-bg hover_shape2" />
							<span className="hover-shape-bg hover_shape3" />
						</div>
					</div>
				</Box>
			)}
		</>
	);
};

export default ConnectionCheck;
