import React from 'react';
import { useCart } from '../../hooks/use-cart';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { gsap } from 'gsap';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout }) => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, display: 'block' });
      gsap.to(drawerRef.current, { x: 0, duration: 0.4, ease: 'power3.out' });
    } else {
      document.body.style.overflow = 'unset';
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, display: 'none' });
      gsap.to(drawerRef.current, { x: '100%', duration: 0.4, ease: 'power3.in' });
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div 
        ref={overlayRef}
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-[60] hidden opacity-0 backdrop-blur-sm"
      />

      {/* Drawer */}
      <div 
        ref={drawerRef}
        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#15171C] z-[70] translate-x-full border-l border-[#2A2D36] flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#2A2D36] flex justify-between items-center bg-[#0B0C0F]">
          <div className="flex items-center gap-3">
            <ShoppingBag className="text-[#FF2D8F] w-5 h-5" />
            <h2 className="font-display font-black text-xl text-[#F4F6FA] uppercase tracking-wider">Inventory</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#2A2D36] text-[#A9B1C3] transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-[#2A2D36] flex items-center justify-center rotate-3">
                <ShoppingBag size={40} className="text-[#A9B1C3]" />
              </div>
              <div>
                <p className="text-[#F4F6FA] font-bold uppercase">Inventory Empty</p>
                <p className="text-[#A9B1C3] text-sm mt-1">No mayhem scheduled yet.</p>
              </div>
              <button 
                onClick={onClose}
                className="btn-primary mt-4"
              >
                GO CAUSE CHAOS
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 p-4 bg-[#0B0C0F] border border-[#2A2D36] group relative">
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-[#FF2D8F] text-[#0B0C0F] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 font-bold"
                >
                  ×
                </button>
                <div className="w-20 h-20 bg-[#15171C] border border-[#2A2D36] p-2 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 space-y-2">
                  <h3 className="text-[#F4F6FA] font-display font-bold text-sm uppercase leading-tight">{item.name}</h3>
                  <p className="text-[#FF2D8F] font-mono font-bold">£{(item.price * item.quantity).toFixed(2)}</p>
                  
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="w-6 h-6 bg-[#2A2D36] text-[#F4F6FA] flex items-center justify-center hover:bg-[#FF2D8F] hover:text-[#0B0C0F] transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-mono text-[#F4F6FA]">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 bg-[#2A2D36] text-[#F4F6FA] flex items-center justify-center hover:bg-[#FF2D8F] hover:text-[#0B0C0F] transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 bg-[#0B0C0F] border-t border-[#2A2D36] space-y-4">
            <div className="flex justify-between items-end">
              <span className="text-[#A9B1C3] font-mono text-sm">TOTAL DAMAGE</span>
              <span className="text-[#F4F6FA] font-display font-black text-2xl tracking-tighter">
                £{totalPrice.toFixed(2)}
              </span>
            </div>
            <p className="text-[#A9B1C3] text-xs font-mono text-center">
              SHIPPING CALCULATED AT THE CRIME SCENE
            </p>
            <button 
              onClick={onCheckout}
              className="btn-primary w-full py-4 text-lg"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </>
  );
};
