import { Trans } from "@lingui/react/macro";
import { Link, useParams } from "react-router-dom";

export function HomePage() {
  const { locale } = useParams<{ locale: string }>();

  return (
    <div className="home">
      <h2>
        <Trans>Master Vim in 2 hours</Trans>
      </h2>
      <p>
        <Trans>Sushida-style Vim drills — practice at the speed of thought.</Trans>
      </p>
      <Link to={`/${locale}/drills`} className="btn-primary">
        <Trans>Start drilling</Trans>
      </Link>
    </div>
  );
}
