import { Bandsdata } from "../data/bandsdata";
import BandExplorer from "../components/BandExplorer";

export default function BandsPage() {
  return (
    <div className="band-container">
      <h1 className="band-title">Favorite Music Band</h1>

      <BandExplorer Bands={Bandsdata} />
    </div>
  );
}
