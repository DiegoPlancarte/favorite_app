Rails.application.routes.draw do
  get '*path', to: 'home#index', constraints: ->(request){ request.format.html? }
  root to: "home#index"
end
