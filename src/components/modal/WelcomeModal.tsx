"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Coffee, Code, Database, Palette, Zap, Mail } from "lucide-react";
import { useProfileStore } from "@/src/store/useProfileStore";

export function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const { setUsername: setProfileUsername } = useProfileStore();

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('hasVisitedBefore');
    const hasProfileData = localStorage.getItem('profile-storage');
    
    if (!hasVisitedBefore && !hasProfileData) {
      setIsOpen(true);
    }
  }, []);

  const handleContinue = () => {
    if (username.trim()) {
      setProfileUsername(username.trim());
      localStorage.setItem('hasVisitedBefore', 'true');
      setIsOpen(false);
    }
  };

  const handleClose = () => {
    localStorage.setItem('hasVisitedBefore', 'true');
    setIsOpen(false);
  };

  const isContinueDisabled = !username.trim();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center p-4 z-50"
        >
          {/* Envelope */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative max-w-md w-full"
          >
            {/* Flap do envelope */}
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-300 rounded-t-lg z-0 shadow-sm" />
            
            {/* Corpo do envelope */}
            <div className="bg-gray-200 rounded-lg p-6 shadow-2xl relative z-10">
              {/* Carta */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-sm shadow-md relative"
              >
                {/* Linhas do papel de carta */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(to bottom, transparent 95%, #f3f4f6 95%),
                      linear-gradient(to right, #f9fafb 1px, transparent 1px)
                    `,
                    backgroundSize: '100% 24px, 24px 100%',
                    opacity: 0.3
                  }}
                />

                {/* Cabeçalho da carta */}
                <div className="border-b border-gray-100 p-6 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                        <Coffee className="text-white" size={20} />
                      </div>
                      <div>
                        <h1 className="text-xl font-bold text-gray-900 font-serif">
                          Cafetaria
                        </h1>
                        <p className="text-xs text-gray-500">Uma carta especial para você</p>
                      </div>
                    </div>
                    <button
                      onClick={handleClose}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>

                {/* Conteúdo da carta */}
                <div className="p-6 pt-4">
                  {/* Saudação personalizada */}
                  <div className="mb-6">
                    <p className="text-gray-700 text-lg leading-relaxed">
                      Olá{" "}
                      <span className="inline-block bg-gray-100 px-3 py-1 rounded border border-gray-200 font-medium text-gray-900 min-w-[120px] text-center">
                        {username.trim() || "____________"}
                      </span>
                      , seja muito bem-vindo(a) à nossa cafetaria!
                    </p>
                  </div>

                  {/* Input para nome */}
                  <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-medium mb-3">
                      Para começarmos, digite seu nome:
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Seu nome aqui..."
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-300 outline-none transition-all text-gray-900 placeholder-gray-400 font-serif text-lg"
                      autoFocus
                    />
                  </div>

                  {/* Informações técnicas */}
                  <div className="bg-gray-50 rounded-sm p-4 border border-gray-200 mb-6">
                    <h3 className="text-gray-800 font-semibold mb-3 flex items-center gap-2 text-sm">
                      <Code size={16} className="text-gray-600" />
                      Sobre este projeto
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      Este site foi desenvolvido como projeto de estudo, demonstrando o uso de modernas tecnologias web.
                    </p>
                    
                    <div className="grid grid-cols-1 gap-2 text-xs text-gray-500">
                      <div className="flex items-center gap-2">
                        <Zap size={12} className="text-gray-400" />
                        <span><strong>React + Next.js</strong> - Framework principal</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Code size={12} className="text-gray-400" />
                        <span><strong>TypeScript</strong> - Tipagem estática</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Database size={12} className="text-gray-400" />
                        <span><strong>Zustand</strong> - Gerenciamento de estado</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Palette size={12} className="text-gray-400" />
                        <span><strong>Lucide Icons</strong> - Ícones da aplicação</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap size={12} className="text-gray-400" />
                        <span><strong>Framer Motion</strong> - Animações</span>
                      </div>
                    </div>
                  </div>

                  {/* Aviso */}
                  <div className="bg-blue-50 border border-blue-200 rounded-sm p-3 mb-6">
                    <p className="text-blue-700 text-xs text-center leading-relaxed">
                      💡 <strong>Importante:</strong> Este é um site demonstrativo para portfólio. 
                      Nenhum produto é comercializado de verdade.
                    </p>
                  </div>

                  {/* Botão continuar */}
                  <button
                    onClick={handleContinue}
                    disabled={isContinueDisabled}
                    className={`
                      w-full py-3 px-6 rounded-sm font-medium text-white transition-all duration-300
                      flex items-center justify-center gap-2
                      ${isContinueDisabled 
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500' 
                        : 'bg-gray-900 hover:bg-gray-800 shadow-md hover:shadow-lg transform hover:scale-[1.02]'
                      }
                    `}
                  >
                    <Mail size={16} />
                    Abrir Cafetaria
                  </button>
                </div>

                {/* Rodapé da carta */}
                <div className="border-t border-gray-100 p-4">
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>Com carinho,</span>
                    <span>Equipe Cafetaria</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Selo do envelope */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="absolute -top-2 -right-2 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white"
            >
              <Mail size={16} />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}