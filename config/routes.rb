Rails.application.routes.draw do
  resources :messages, only: [:show, :new, :create]

    root :to => 'messages#index'
end
