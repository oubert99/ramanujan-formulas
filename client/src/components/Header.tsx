import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="ascii-logo">
        <pre>{`
╔════════════════════════════════════════════════════════════════════════════════════╗
║                                                                                    ║
║  ██████╗  █████╗ ███╗   ███╗ █████╗ ███╗   ██╗██╗   ██╗     ██╗ █████╗ ███╗   ██╗  ║
║  ██╔══██╗██╔══██╗████╗ ████║██╔══██╗████╗  ██║██║   ██║     ██║██╔══██╗████╗  ██║  ║
║  ██████╔╝███████║██╔████╔██║███████║██╔██╗ ██║██║   ██║     ██║███████║██╔██╗ ██║  ║
║  ██╔══██╗██╔══██║██║╚██╔╝██║██╔══██║██║╚██╗██║██║   ██║██   ██║██╔══██║██║╚██╗██║  ║
║  ██║  ██║██║  ██║██║ ╚═╝ ██║██║  ██║██║ ╚████║╚██████╔╝╚█████╔╝██║  ██║██║ ╚████║  ║
║  ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝  ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═══╝  ║
║                                                                                    ║
║    Mathematical Approximation Evaluator                                            ║
║    Input JSON → AI Model → Best Approximations                                     ║
║                                                                                    ║
╚═══════════════════════════════════════════════════════════════════════════════════╝
        `}</pre>
      </div>
      
      <div className="subtitle">
        <span className="blink">⚡</span> Mathematical Discovery System <span className="blink">⚡</span>
      </div>
      
      <div className="instructions">
        <p>
          ┌─ Input mathematical approximations as JSON<br/>
          ├─ Choose your AI model to generate expressions<br/>
          └─ Get ranked results by elegance and accuracy
        </p>
      </div>
    </header>
  );
};

export default Header;
