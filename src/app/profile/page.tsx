"use client";

import { useProfileStore } from "@/src/store/useProfileStore";
import { useOrdersStore } from "@/src/store/useOrdersStore";
import { ArrowLeft, User, User2, Calendar, Package, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { HeaderGlobal } from "@/src/components/layout/HeaderGlobal";
import { Input } from "@/src/components/ui/Input";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const { username, avatar, setUsername, setAvatar } = useProfileStore();
  const { orders } = useOrdersStore(); 
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleBackHome = () => {
    router.push("/");
  };

  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-10 lg:px-20 py-6">
        <HeaderGlobal />
        
        <button
          onClick={handleBackHome}
          className="
            flex items-center gap-2
            text-yellow-700 border border-yellow-600 
            px-4 py-2 rounded-lg 
            hover:bg-yellow-600 hover:text-white
            transition duration-300 cursor-pointer mb-8
          "
        >
          <ArrowLeft size={20} />
          Voltar para Home
        </button>

        <main className="space-y-4">
          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Informações Pessoais</h2>
            
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-white border-4 border-white shadow-lg">
                    {avatar ? (
                      <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                        <User size={48} className="text-purple-400" />
                      </div>
                    )}
                  </div>
                </div>
                
                <label className="cursor-pointer px-6 py-3 bg-violet-500  text-white rounded-xl hover:bg-violet-800 transition-all duration-300 shadow-md hover:shadow-lg font-medium text-sm">
                  Alterar Foto
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </label>
              </div>

              <div className="flex-1 min-w-0">
                <label className="block text-sm font-medium text-gray-700 mb-3">Nome de Usuário</label>
                <Input
                  value={username}
                  onChange={(value: string) => setUsername(value)}
                  placeholder="Digite seu nome"
                  icon={<User2 size={18} className="text-gray-400" />}
                  variant="light"
                />
                <p className="text-xs text-gray-500 mt-2">Este nome será exibido publicamente</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100">
            <div className="flex items-center gap-3 mb-6">
              <Package className="text-purple-600" size={24} />
              <h2 className="text-xl font-semibold text-gray-900">Histórico de Compras</h2>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="text-gray-400" size={24} />
                </div>
                <p className="text-gray-600 text-lg">Nenhuma compra realizada ainda.</p>
                <p className="text-gray-500 text-sm mt-1">Suas compras aparecerão aqui</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl border border-gray-200 hover:border-purple-200 transition-all duration-300 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleOrder(order.id)}
                      className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Package size={18} className="text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <p className="font-semibold text-gray-900">Pedido #{order.id}</p>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Calendar size={14} />
                              <span>{new Date(order.date).toLocaleDateString('pt-BR')}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-600">
                              {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                            </span>
                            <span className="text-sm font-semibold text-gray-900">
                              R$ {order.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium hidden sm:block">
                          Concluído
                        </div>
                        {expandedOrder === order.id ? (
                          <ChevronUp size={20} className="text-gray-400" />
                        ) : (
                          <ChevronDown size={20} className="text-gray-400" />
                        )}
                      </div>
                    </button>

                    {expandedOrder === order.id && (
                      <div className="px-6 pb-6 border-t border-gray-100 animate-in fade-in duration-200">
                        <div className="mt-4">
                          <p className="text-sm font-medium text-gray-700 mb-3">Itens do pedido:</p>
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                                <div className="flex-1">
                                  <p className="text-gray-900 font-medium">{item.name}</p>
                                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                    <span>Quantidade: {item.quantity}x</span>
                                    <span>•</span>
                                    <span>Preço unitário: R$ {item.price.toFixed(2)}</span>
                                  </div>
                                </div>
                                <p className="text-gray-900 font-semibold text-lg">
                                  R$ {(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 mt-4 border-t border-gray-200">
                          <span className="text-gray-700 font-semibold text-lg">Total do pedido:</span>
                          <span className="text-xl font-bold text-gray-900">
                            R$ {order.total.toFixed(2)}
                          </span>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600 font-medium">Data e hora:</p>
                              <p className="text-gray-900">
                                {new Date(order.date).toLocaleString('pt-BR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                            <div>
                              <p className="text-gray-600 font-medium">Status:</p>
                              <p className="text-green-700 font-medium">Pedido Concluído</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}