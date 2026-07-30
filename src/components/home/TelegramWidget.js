// Static promo, not data-driven - same in the mockup.
export default function TelegramWidget() {
    return (
        <div className="tg-w">
            <div className="tg-t">Never miss a streak</div>
            <div className="tg-s">Get instant alerts on Telegram before kick-off.</div>
            <button className="tg-b"><i className="ti ti-brand-telegram" style={{ fontSize: 15 }} />Join channel</button>
        </div>
    );
}
