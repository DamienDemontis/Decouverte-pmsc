HTMLProofer::Configuration.defaults do |config|
  # Ignore dev URLs
  config.ignore_urls = [%r{http://localhost:4000}]

  # Network robustness
  config.typhoeus_config = {
    timeout: 20,
    connecttimeout: 10,
    followlocation: true,
    maxredirs: 5
  }

  # Soft 404 detection (only for HTML)
  config.typhoeus_config[:on_complete] = lambda do |response|
    next unless response.headers['Content-Type']&.include?('text/html')

    body = response.body&.downcase || ""

    patterns = [
      /page not found/,
      /this page does not exist/,
      /sorry.*(not find|unavailable)/,
      /product not found/,
      /error 404/,
      /currently unavailable/
    ]

    if response.code == 200
      if patterns.any? { |r| body.match?(r) }
        response.return_code = :soft_404
      elsif body.strip.empty? || body.length < 200
        response.return_code = :soft_404
      end
    end
  end
end
