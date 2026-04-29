const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000}}>
      <div className="modal-content" style={{background:'white', borderRadius:'12px', width:'90%', maxWidth:'600px', maxHeight:'90vh', overflow:'auto'}}>
        <div style={{padding:'20px', borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <h3>{title}</h3>
          <button onClick={onClose} style={{background:'none', border:'none', fontSize:'1.5rem', cursor:'pointer'}}>✕</button>
        </div>
        <div style={{padding:'20px'}}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;