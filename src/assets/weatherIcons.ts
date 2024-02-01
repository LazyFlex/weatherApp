import clearD from "../assets/flat/01d.png";
import clearN from "../assets/flat/01n.png";
import fewCloudsD from "../assets/flat/02d.png";
import fewCloudsN from "../assets/flat/02n.png";
import clouds from "../assets/flat/03d.png";
import rain from "../assets/flat/09d.png";
import rainD from "../assets/flat/10d.png";
import rainN from "../assets/flat/10n.png";
import snow from "../assets/flat/13d.png";
import mistN from "../assets/flat/50d.png";
import mistD from "../assets/flat/50d.png";




const iconMappings: Record<string, string> = {
  '01d': clearD,
  '01n': clearN,
  '02d': fewCloudsD,
  '02n': fewCloudsN,
  '03d': clouds,
  '03n': clouds,
  '04d': clouds,
  '04n': clouds,
  '09d': rain,
  '09n': rain,
  '10d': rainD,
  '10n': rainN,
  '13d': snow,
  '13n': snow,
  '50d': mistD,
  '50n': mistN,
};

export default iconMappings;
