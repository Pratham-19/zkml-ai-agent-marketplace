import { ConnectKitButton } from "connectkit";

export default function CustomConnectButton() {
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, show, address }) => {
        return (
          <button onClick={show} className="text-sm font-medium">
            {isConnected
              ? address?.slice(0, 6) + "..." + address?.slice(-4)
              : "Connect Wallet"}
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
