import Link from "next/link";
export function Footer() {
  return (<footer>
    <nav aria-label="Policies"><Link href="/legal/privacy">Privacy policy</Link><Link href="/legal/terms">Terms of service</Link><Link href="/legal/data">Data &amp; AI policy</Link><Link href="/legal/refunds">Refunds &amp; credits</Link><Link href="/legal/acceptable-use">Acceptable use</Link><Link href="/legal/security">Security</Link></nav>
    <p>© {new Date().getFullYear()} VIRALOS</p>
  </footer>);
}
