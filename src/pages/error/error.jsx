function Error() {
  return (
    <div style={{
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "60px 24px",
      gap: "12px",
      textAlign: "center"
    }}>
      <div style={{ fontSize: "40px" }}>🔒</div>
      <h2 style={{ fontSize: "20px", fontWeight: 700, margin: 0 }}>Access Denied</h2>
      <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "320px" }}>
        You need to be signed in to view this page.
      </p>
    </div>
  );
}

export default Error;
