module ApplicationHelper
  def modal_header(title)
    content_for(:header) { title }
  end
end
